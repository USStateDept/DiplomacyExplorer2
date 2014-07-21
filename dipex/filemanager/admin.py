from django.contrib import admin
from django import forms
from filemanager.models import ImageMedia


class ImageMediaAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)


admin.site.register(ImageMedia, ImageMediaAdmin)
