/**
 * @author Jiyao Wang <wangjiy@ncbi.nlm.nih.gov> / https://github.com/ncbi/icn3d
 */

import {HashUtilsCls} from '../../utils/hashUtilsCls.js';
import {UtilsCls} from '../../utils/utilsCls.js';

import {Html} from '../../html/html.js';

import {FirstAtomObj} from '../selection/firstAtomObj.js';
import {Selection} from '../selection/selection.js';
import {HlUpdate} from '../highlight/hlUpdate.js';
import {Annotation} from '../annotations/annotation.js';
import {Resid2spec} from '../selection/resid2spec.js';
import {HlObjects} from '../highlight/hlObjects.js';

class Cartoon2d {
    constructor(icn3d) {
        this.icn3d = icn3d;
    }

    draw2Dcartoon(type) { var ic = this.icn3d, me = ic.icn3dui;
       ic.bGraph = false; // differentiate from force-directed graph for interactions

       var graphStr = this.getCartoonData(type);

       ic.viewInterPairsCls.drawGraphWrapper(graphStr, ic.deferredCartoon2d);

       ic.icn3dui.htmlCls.clickMenuCls.setLogCmd("cartoon 2d " + type, true);
    }

    getCartoonData(type) { var ic = this.icn3d, me = ic.icn3dui;
       // get the nodes and links data
       var nodeArray = [], linkArray = [];
       var nodeStr, linkStr;
       var node_link = this.getNodesLinksForSetCartoon(type);

       nodeArray = node_link.node;

       // removed duplicated nodes
       var nodeJsonArray = [];
       var checkedNodeidHash = {}
       var cnt = 0;
       for(var i = 0, il = nodeArray.length; i < il; ++i) {
           var node = nodeArray[i];
           var nodeJson = JSON.parse(node);
           if(!checkedNodeidHash.hasOwnProperty(nodeJson.id)) {
               nodeJsonArray.push(nodeJson);
               checkedNodeidHash[nodeJson.id] = cnt;
               ++cnt;
           }
       }
       var nodeStrArray = [];
       for(var i = 0, il = nodeJsonArray.length; i < il; ++i) {
           var nodeJson = nodeJsonArray[i];
           nodeStrArray.push(JSON.stringify(nodeJson));
       }
       nodeStr = nodeStrArray.join(', ');
       // linkStr
       linkArray = node_link.link;
       linkStr = linkArray.join(', ');

       var selectedAtoms = ic.hAtoms;
       var chemicalNodeStr = '';
       var hBondLinkStr = '', ionicLinkStr = '', halogenpiLinkStr = '', contactLinkStr = '',
         disulfideLinkStr = '', crossLinkStr = '';

       contactLinkStr += ic.getGraphCls.getContactLinksForSet(ic.hAtoms, 'chain', true);

       var resStr = '{"nodes": [' + nodeStr + chemicalNodeStr + '], "links": [';
       resStr += linkStr + disulfideLinkStr + crossLinkStr + contactLinkStr + hBondLinkStr + ionicLinkStr + halogenpiLinkStr;

       resStr += ']}';
       return resStr;
    }

    getNodesLinksForSetCartoon(type) { var ic = this.icn3d, me = ic.icn3dui;
       var nodeArray = [], linkArray = [];
       var cnt = 0;
       var thickness = ic.icn3dui.htmlCls.ssValue;

       var prevChain = '', prevResName = '', prevResi = 0, prevAtom, lastChain = '';
       var x, y, z, length = 0, prevX, prevY, prevZ;
       var bBegin = false, bEnd = true;
       var resName, residLabel;

       var setName = 'a';

       if(type == 'chain') {
           var chainidHash = {};
           for(var i in ic.hAtoms) {
               var atom = ic.atoms[i];
               if(atom.chain == 'DUM') continue;

               var chainid = atom.structure + '_' + atom.chain;

               if(ic.proteins.hasOwnProperty(i)) {
                   if(!chainidHash.hasOwnProperty(chainid)) {
                       chainidHash[chainid] = {};
                   }
                   chainidHash[chainid][atom.serial] = atom;
               }
           }

           for(var chainid in chainidHash) {
               var extent = ic.contactCls.getExtent(chainidHash[chainid]);

               var radiusSq = (extent[1][0] - extent[0][0]) * (extent[1][0] - extent[0][0]) + (extent[1][1] - extent[0][1]) * (extent[1][1] - extent[0][1]) + (extent[1][2] - extent[0][2]) * (extent[1][2] - extent[0][2]);
               var radius = Math.sqrt(radiusSq);

               var serial = Object.keys(chainidHash[chainid])[0];
               var atom = ic.atoms[serial];

               residLabel = chainid;

               nodeArray.push('{"id": "' + chainid + '", "r": "' + residLabel + '", "s": "' + setName + '", "x": ' + extent[2][0].toFixed(0)
                   + ', "y": ' + extent[2][1].toFixed(0) + ', "c": "' + atom.color.getHexString().toUpperCase() + '"}');
           }
       }
       else if(type == 'domain') {
       }
       else if(type == 'secondary') {
           ic.resi2resirange = {};
           var resiArray = [], tmpResName;

           for(var i in ic.hAtoms) {
               var atom = ic.atoms[i];
               if(atom.chain == 'DUM') continue;

               if((atom.ssbegin || atom.ssend) && atom.name == "CA" && atom.elem == "C") {
                   var resid = atom.structure + '_' + atom.chain + '_' + atom.resi;

                   //if((prevChain === '' || prevChain == atom.chain) && bEnd && atom.ssbegin) {
                   if(bEnd && atom.ssbegin) {
                       prevX = atom.coord.x;
                       prevY = atom.coord.y;
                       prevZ = atom.coord.z;
                       bBegin = true;
                       bEnd = false;

                       prevAtom = atom;

                       resName = me.utilsCls.residueName2Abbr(atom.resn) + atom.resi
                       // add 1_1_ to match other conventionssuch as seq_div0_1KQ2_A_50
                       residLabel = '1_1_' + resid;

                       lastChain = atom.chain;
                   }

                   if(bBegin) {
                       tmpResName = me.utilsCls.residueName2Abbr(atom.resn) + atom.resi
                       tmpResName += '.' + atom.chain;
                       if(Object.keys(ic.structures).length > 1) tmpResName += '.' + atom.structure;

                       resiArray.push(tmpResName);
                   }

                   if(lastChain == atom.chain && bBegin && atom.ssend) {
                       x = 0.5 * (prevX + atom.coord.x);
                       y = 0.5 * (prevY + atom.coord.y);
                       z = 0.5 * (prevZ + atom.coord.z);

                       length = atom.coord.distanceTo(prevAtom.coord);

                       bBegin = false;
                       bEnd = true;

                       resName += '-' + atom.resi;
                       residLabel += '-' + atom.resi;

                       resName += '.' + atom.chain;
                       if(Object.keys(ic.structures).length > 1) resName += '.' + atom.structure;

                       for(var j = 0, jl = resiArray.length; j < jl; ++j) {
                           tmpResName = resiArray[j];
                           ic.resi2resirange[tmpResName] = resName;
                       }
                       resiArray = [];

                       if(cnt > 0 && prevChain == atom.chain) {
                           linkArray.push('{"source": "' + prevResName + '", "target": "' + resName
                               + '", "v": ' + thickness + ', "c": "' + prevAtom.color.getHexString().toUpperCase() + '"}');
                       }
                       nodeArray.push('{"id": "' + resName + '", "r": "' + residLabel + '", "s": "' + setName + '", "x": ' + x.toFixed(0)
                           + ', "y": ' + y.toFixed(0) + ', "c": "' + atom.color.getHexString().toUpperCase() + '"}');

                       prevChain = atom.chain;
                       prevResName = resName;
                       ++cnt;
                   }
               }
           } //end for
       }

       return {"node": nodeArray, "link":linkArray}
    }

    click2Dcartoon() { var ic = this.icn3d, me = ic.icn3dui;
        var thisClass = this;

        me.myEventCls.onIds("#" + me.pre + "2ddgm_chain", "click", function(e) { var ic = me.icn3d;
           e.preventDefault();
           //if(!me.cfg.notebook) dialog.dialog( "close" );
           ic.cartoon2dCls.draw2Dcartoon('chain');
        });

        me.myEventCls.onIds("#" + me.pre + "2ddgm_domain", "click", function(e) { var ic = me.icn3d;
           e.preventDefault();
           //if(!me.cfg.notebook) dialog.dialog( "close" );
           ic.cartoon2dCls.draw2Dcartoon('domain');
        });

        me.myEventCls.onIds("#" + me.pre + "2ddgm_secondary", "click", function(e) { var ic = me.icn3d;
           e.preventDefault();
           //if(!me.cfg.notebook) dialog.dialog( "close" );
           ic.cartoon2dCls.draw2Dcartoon('secondary');
        });

        //$(document).on("click", "#" + ic.pre + "dl_2ddgm .icn3d-node", function(e) { var ic = thisClass.icn3d;
        //    e.stopImmediatePropagation();
        //});
    }
}

export {Cartoon2d}
