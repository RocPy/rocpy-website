from flask import Flask, session, render_template, request_started
from werkzeug import SharedDataMiddleware
import os

from .flask_contact.contact import contact_page

# create our application
app = Flask(__name__)

# Register flask_contact Blueprint
app.register_blueprint(contact_page, url_prefix='/contact')

# Config
if app.config['DEBUG']:
    app.config.from_object('flask_application.config.DevelopmentConfig')
    app.logger.info("Config: Development")
else:
    app.config.from_object('flask_application.config.ProductionConfig')
    app.logger.info("Config: Production")


# Source: http://www.jeffff.com/serving-media-in-the-flask-local-dev-server:w
def serve_static(sender):
    if app.config['DEBUG']:
        app.wsgi_app = SharedDataMiddleware(app.wsgi_app,
                                            {'/': os.path.join(
                                                os.path.dirname(__file__),
                                                'static')})


@app.before_request
def before_request():
    session["debug"] = app.debug


@app.after_request
def after_request(response):
    return response


@app.context_processor
def inject_site_defaults():
        return dict(site_title=app.config['SITE_NAME'])


@app.route('/')
def page_home():
    session['tab_selected'] = 'home'
    return render_template('page_t_home.html', page_title="Home")


@app.route('/meetings')
def page_meetings():
    session['tab_selected'] = 'meetings'
    return render_template('page_t_meetings.html', page_title="Meetings")


@app.route('/workshops')
def page_workshops():
    session['tab_selected'] = 'workshops'
    return render_template('page_t_workshops.html', page_title="Workshops")

request_started.connect(serve_static, app)
