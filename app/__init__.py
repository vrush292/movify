from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect
from flask_login import LoginManager
import os
# Initialize extensions
csrf = CSRFProtect()
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()  # Initialize the LoginManager

def create_app():
    app = Flask(__name__)
    
    app.config['UPLOAD_FOLDER'] = 'static/uploads'
    app.config['ALLOWED_EXTENSIONS'] = {'png', 'jpg', 'jpeg', 'gif'}
    
    # Load configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # Change to your database URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'vk292'  # Change to a secure key

    # Initialize extensions
    csrf.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)  # Initialize Flask-Login

    # Load user loader callback
    @login_manager.user_loader
    def load_user(user_id):
        from .models import User  # Import User model here to avoid circular imports
        return User.query.get(int(user_id))

    with app.app_context():
        db.create_all()  # Create database tables

    # Register blueprints
    from .routes import api, main_routes  # Import your routes
    app.register_blueprint(api)
    app.register_blueprint(main_routes)

    return app