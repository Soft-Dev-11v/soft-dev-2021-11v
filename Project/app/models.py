"""
Copyright (c) 2019 - present AppSeed.us
"""

from app         import db
from flask_login import UserMixin

class Users(db.Model, UserMixin):

    __tablename__ = 'Users'

    id       = db.Column(db.Integer,     primary_key=True)
    user     = db.Column(db.String(64),  unique = True)
    email    = db.Column(db.String(120), unique = True)
    password = db.Column(db.String(500))

    def __init__(self, user, email, password):
        self.user       = user
        self.password   = password
        self.email      = email

    def __repr__(self):
        return str(self.id) + ' - ' + str(self.user)

    def save(self):

        # inject self into db session    
        db.session.add ( self )

        # commit change and save the object
        db.session.commit( )

        return self 



class Recipe():

    __tablename__ = 'Recipes'
    
    name        = db.Column(db.String(50))
    description = db.Column(db.String)
    image       = db.Column(db.String(50))

    def __init__(self, id, name, description, image):
        self.id          = id
        self.name        = name
        self.description = description
        self.image       = image

    def save(self):
        # inject self into db session    
        db.session.add ( self )
        # commit change and save the object
        db.session.commit( )

        return self

class Ingredients():

    __tablename__ = 'Ingredients'

    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(50))
    amount      = db.Column(db.Integer)
    type        = db.Column(db.String())
    recipeId    = db.Column(db.Integer)

    def __init__(self, id, name, amount, type, recipeId):
        self.id         = id
        self.name       = name
        self.amount     = amount
        self.type       = type
        self.recipeId   = recipeId

    def save(self):

        # inject self into db session    
        db.session.add ( self )

        # commit change and save the object
        db.session.commit( )

        return self
