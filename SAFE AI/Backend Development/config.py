# strict configuration - security flags, cookie security

import os

class ProductionConfig:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Cookie & Session Protection
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Strict'
    
    # JWT Settings
    JWT_COOKIE_SECURE = True
    JWT_TOKEN_LOCATION = ['headers']  # Force React to pass JWT in Auth Header
    JWT_ACCESS_TOKEN_EXPIRES = 900    # 15-minute token rotation
