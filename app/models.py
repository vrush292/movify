from . import db  # Import the db instance from the package
from datetime import datetime
from flask_login import UserMixin  # Import UserMixin

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    bio = db.Column(db.Text, nullable=True)  # Add bio field
    wishlist = db.relationship('Wishlist', backref='user', lazy=True)

    def is_active(self):
        return True  # This method is now inherited from UserMixin
    @property
    def wishlist_movies(self):
        return [item.movie_id for item in self.wishlist]
        

class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False)
    poster_path = db.Column(db.String(200), nullable=False)  # Path to the movie poster image

class Wishlist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'), nullable=False)
    added_on = db.Column(db.DateTime, default=datetime.utcnow)

    movie = db.relationship('Movie', backref='wishlist', lazy=True)

