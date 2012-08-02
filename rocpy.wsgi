import site, os
site.addsitedir(os.path.dirname(__file__))

from rocpy import app as application
