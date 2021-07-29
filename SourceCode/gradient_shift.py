import math
import numpy as np


def ellipse(x, y, rx, ry, theta=45, rotation=0):
    rxn = rx * np.around(math.cos(math.radians(theta+rotation)), 5)
    ryn = math.sqrt(ry**2 * (1 - (rxn**2/rx**2)))

    return rxn + x, y - ryn


e = ellipse(237, 95, 16.5, 12.5, theta=45, rotation=0)

print(e)

