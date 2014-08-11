from django import forms
from django.db import models
from django.conf import settings
from jsonfield import JSONField

class LocationPickerWidget(forms.TextInput):
    class Media:
        css = {
            'all': (
                "/" + BASE_URL + "/static/css/locationpicker.css",
            )
        }
#<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
#<script type="text/javascript" src='http://maps.google.com/maps/api/js?sensor=false&libraries=places'></script>
#<script src="/static/lib/jquery-locationpicker-plugin-master/locationpicker.jquery.js"></script>

        js = (
            #'/static/lib/jquery/jquery-1.11.0.min.js',
            'http://maps.google.com/maps/api/js?sensor=false&libraries=places',
            "/" + BASE_URL + "/static/lib/jquery-locationpicker-plugin-master/locationpicker.jquery.js",
            "/" + BASE_URL + "/static/js/locationpicker.js",
        )

    def __init__(self, language=None, attrs=None):
        self.language = language or settings.LANGUAGE_CODE[:2]
        super(LocationPickerWidget, self).__init__(attrs=attrs)

    def render(self, name, value, attrs=None):
        if None == attrs:
            attrs = {}
        attrs['class'] = 'location_picker'
        return super(LocationPickerWidget, self).render(name, value, attrs)

class LocationField(JSONField):

    def formfield(self, **kwargs):
        kwargs['widget'] = LocationPickerWidget
        return super(LocationField, self).formfield(**kwargs)