# 2D-3D-Molecular-Cartoons

## What is the PROBLEM?
Graphical language is the most intuitive and most understandable way in human communication - 'a picture is worth a thousand words'. Molecular graphics is widely used in the field of biology and medicine to illustrate the complex molecular structure. A molecular three-dimensional (3D) architecture is normally illustrated with various models, including ribbon, ball-and-stick, sphere (CPK), among other representations. However, an emerging requirement from biologists is to schematically depict those information on a two-dimensional (2D) figure. The simplified 2D version may provide a straightforward and easy understanding of a complex 3D protein structure. Although 2D and 3D visualisation are complementary to each other, simplification of the complex 3D into 2D illustration is still challenging, especially to exhibit the molecular configurations, profiles, and interactions. Herein, we are trying to showcase the 2D cartoons in three different levels, namely chain level, domain level (main focus) and secondary structure level.

## Objective
2D representations of a 3D structure are very useful in understanding the structure. We are going to show the 2D cartoon in three different levels: chain level, domain level, and secondary structure level. Our main focus will be the domain level 2D cartoon.

## Workflow
<img src="https://github.com/hackathonismb/2D-3D-Molecular-Cartoons/blob/main/pipeline.png" width="400"/><br><br>
<img src="https://github.com/hackathonismb/2D-3D-Molecular-Cartoons/blob/main/2dcartoon-levels.png" width="400"/><br><br>

## Steps to show 2D cartoon in the domain level
<b>1. Get the residue range for each domain</b> (by Jiyao Wang)

  Input: chain ID, e.g., 6VXX_A

  Output: A list of residue numbers for each domain
  
<b>2. Find the center and width and length of the area (XY plane) covered by the atoms in the domain</b> (by Kevin Yang)

  Input: a list of atoms with x,y,z coordinates

  Output: The center and width and length of the atoms in the XY plane. I.e., the z-coordinates can be ignored.

<b>3. Show the domains in SVG as ovals using the center, width, and length</b> (by Jack Lin)

  Input: A list of nodes with center, width, and length

  Output: a SVG text showing the nodes as ovals using the center, width and length

<b>4. Use simple shapes (e.g., triangles, rectangles, ovals, hexagone, pentagon, etc) to represent the domains. Add some 3D effect and label to the shape.</b> (By Sarah Zhao, Li Chuin Chong, and Zhiyu Cheng)

  Input: a shape, e.g., hexagon

  Output: a shape with 3D effect. 

  Process: You can use graphics software such as adobe photoshop, or use CSS to achieve the effect. Two reference pages: http://reactome.org/icon-lib/receptor and http://smart.embl-heidelberg.de/smart/search.cgi?keywords=Domain.

<b>5. Show the domains in SVG using the cartoons generated from step 4.</b> (by the team)

  Input: A list of nodes with center, width, and length

  Output: a SVG text showing the nodes as improved cartoons from step 4

## Team members
Jiyao Wang (Team Lead)

Li Chuin Chong (Writer)

Kevin Yang (Tech Lead)

Sarah Zhao

Zhiyu Cheng

Jack Lin
