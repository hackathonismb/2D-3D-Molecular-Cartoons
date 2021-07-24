# 2D-3D-Molecular-Cartoons

## Objective
2D representations of a 3D structure are very useful in understanding the structure. We are going to show the 2D cartoon in three different levels: chain level, domain level, and secondary structure level. Our main focus will be the domain level 2D cartoon.

## Steps to show 2D cartoon in the domain level
<b>1. Get the residue range for each domain</b>

  Input: chain ID, e.g., 6VXX_A

  Output: A list of residue numbers for each domain
  
<b>2. Find the center and width and length of the area (XY plane) covered by the atoms in the domain</b>

  Input: a list of atoms with x,y,z coordinates

  Output: The center and width and length of the atoms in the XY plane. I.e., the z-coordinates can be ignored.

<b>3. Show the domains in SVG as ovals using the center, width, and length</b>

  Input: A list of nodes with center, width, and length

  Output: a SVG text showing the nodes as ovals using the center, width and length

<b>4. Use simple shapes (e.g., triangles, rectangles, ovals, hexagone, pentagon, etc) to represent the domains. Add some 3D effect and label to the shape.</b>

  Input: a shape, e.g., hexagon

  Output: a shape with 3D effect. 

  Process: You can use graphics software such as adobe photoshop, or use CSS to achieve the effect. Two reference pages: http://reactome.org/icon-lib/receptor and http://smart.embl-heidelberg.de/smart/search.cgi?keywords=Domain.

<b>5. Show the domains in SVG using the cartoons generated from step 4.</b>

  Input: A list of nodes with center, width, and length

  Output: a SVG text showing the nodes as improved cartoons from step 4

