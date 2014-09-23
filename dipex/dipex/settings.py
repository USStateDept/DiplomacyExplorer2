"""
Django settings for dipex project.

For more information on this file, see
https://docs.djangoproject.com/en/1.6/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.6/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

BASE_URL = "diplomacyexplorer"


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.6/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'h=&5b6d9@_vu#h2_)x2!ts(!x&afvdba7a%6vj51-(x7pe%gk6'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

TEMPLATE_DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'reversion',
    'layerinfo',
    'filemanager',
    'lockdown',
    'tinymce',
    'watson',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
#    'lockdown.middleware.LockdownMiddleware',
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
)

ROOT_URLCONF = 'dipex.urls'

WSGI_APPLICATION = 'dipex.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.6/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.6/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.6/howto/static-files/

STATIC_ROOT = os.path.join(BASE_DIR, "static")

STATIC_URL = "/" + BASE_URL + '/static/'

MEDIA_URL = "/" + BASE_URL + '/media/'

ADMIN_MEDIA_PREFIX = BASE_URL

MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

#LOCKDOWN_PASSWORDS = ("test",)
#LOCKDOWN_URL_EXCEPTIONS = (r'^/geoserver/$',)

TINYMCE_JS_ROOT = os.path.join(BASE_DIR, "layerinfo/static/tinymce/")

TINYMCE_JS_URL = "/" + BASE_URL + '/static/tinymce/tinymce.min.js'
TINYMCE_DEFAULT_CONFIG = {
    'plugins': "media,image,link, table, preview",
    'theme': "modern",
    'relative_urls': False
#    'remove_script_host': False
#    'cleanup_on_startup': True,
#    'custom_undo_redo_levels': 10,
}
#TINYMCE_SPELLCHECKER = True
#TINYMCE_COMPRESSOR = True

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'caches'),
        'TIMEOUT': 60,
        'OPTIONS': {
            'MAX_ENTRIES': 2000
        }
    }
}

#remove this for production
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}



# Load more settings from a file called local_settings.py if it exists
try:
    from local_settings import *
except ImportError:
    pass
