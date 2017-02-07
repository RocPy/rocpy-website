#!/usr/bin/env python

# http://flask.pocoo.org/docs/config/#development-production


class Config(object):
    SECRET_KEY = 'OXDRICfIhOG9w4cLUXrwjFFZQc8Ncu8ZN5dp2AAoOgCE4afBs3'
    SITE_NAME = 'RocPy'
    MEMCACHED_SERVERS = ['localhost:11211']
    SYS_ADMINS = ['foo@example.com']


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    '''Use "if app.debug" anywhere in your code, that code will run
    in development code.
    '''
    DEBUG = True
