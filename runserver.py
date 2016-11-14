#!/usr/bin/env python3
from rocpy import app

import sys

sys.path.append("./rocpy")

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 8080, debug = True)
