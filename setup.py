import os

from setuptools import setup, find_packages

here = os.path.abspath(os.path.dirname(__file__))
README = open(os.path.join(here, 'README.md')).read()

requires = [
    'flask',
    'wtforms',
    'sqlalchemy',
    'nose',
    'coverage',
    'formencode',
    ]

setup(name='rocpy',
      version='0.0',
      description='rocpy-website',
      long_description=README,
      classifiers=[
        "Programming Language :: Python",
        "Framework :: Flask",
        "Topic :: Internet :: WWW/HTTP",
        "Topic :: Internet :: WWW/HTTP :: WSGI :: Application",
        ],
      author='RocPy',
      author_email='',
      url='http://github.com/rocpy/rocpy-website',
      keywords='web wsgi flask rocpy',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      tests_require=[
      ],
      test_suite='rocpy',
      install_requires=requires,
      )
