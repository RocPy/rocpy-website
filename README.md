RocPy.org Website
=================

RocPy(.org)'s website, to be collaboratively edited by members of
RocPy's group.

The website is written in [Flask](http://flask.pocoo.org/).

Getting Started
-----------------

It is suggested that you use a
[Virtualenv](https://virtualenv.readthedocs.org/en/latest/), especially with
[virtualenvwrapper](http://pypi.python.org/pypi/virtualenvwrapper) when
developing a website using this boilerplate. This will allow you to isolate
your organization's development environment from the rest of your system,
ensuring that you are developing with the proper software.

To do development work on a new website, run the following commands from the
root directory of a cloned copy of this repository to get started:

First, install all required modules:
-   `pip install -r requirements.txt`

Then,
-   `fab server`
    - Will run a local dev server on `http://localhost:8080`
-   `fab help`
    - Print a list of commands available in the fabfile.

Lastly, start editing the site, located in the `flask_application` directory.

You will then be able to access the website at http://localhost:8080.
Changes in the code will automatically reload the web server when necessary.

In production, the server uses WSGI, so please don't rename or move
`__init__.py` in the root of the repository.
