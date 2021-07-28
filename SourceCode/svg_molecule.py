import svgwrite


def create_svg(list_nodes):
    dwg = svgwrite.Drawing('molecule.svg', profile='full')
    for node in list_nodes:
        # node = atom [x, y, w, l]
        dwg.add(dwg.ellipse(center=(node[0], node[1]), r=(node[2], node[3])))
    dwg.save()


ln = [[4, 4, 1, 1], [6, 5, 2, 2]]
create_svg(ln)
