import uuid
from flask import Flask, Request, request, session, g, redirect, url_for, \
             abort, render_template, flash

from contact.contact import contact_page

# create our little application :)
app = Flask(__name__)

# Register Blueprint modules
app.register_blueprint(contact_page, url_prefix='/contact')

app.secret_key = str(uuid.uuid4())

@app.before_request
def before_request():
       session["debug"] = app.debug

@app.after_request
def after_request(response):
    return response

@app.context_processor
def inject_site_defaults():
        return dict(site_title="RocPython PUG")

@app.route('/')
def page_home():
    session['tab_selected'] = 'home'
    return render_template('page_t_home.html', page_title="Home")

@app.route('/events')
def page_about():
    session['tab_selected'] = 'events'
    return render_template('page_t_events.html', page_title="Events")

@app.route('/coding')
def page_news():
    session['tab_selected'] = 'coding'
    return render_template('page_t_coding.html', page_title="Coding")

if __name__ == '__main__':
    app.run(host = "0.0.0.0", port = 8080, debug = True)
