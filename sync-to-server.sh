#!/bin/sh

rsync -av --delete . theosis@alpha-site.pas.rochester.edu:/home/theosis/domains/rocpy.org/wwwapps/website/
ssh theosis@alpha-site.pas.rochester.edu sudo apachectl restart
