from django.contrib import admin
from django import forms
from filemanager.models import ImageMedia


class ImageMediaAdmin(admin.ModelAdmin):
    list_display = ('title', 'url',)

    def get_form(self, request, obj=None, **kwargs):
        self.exclude = []
        if not request.user.is_superuser:
            self.exclude.append('url')
            self.exclude.append('thumbnail')
        return super(ImageMediaAdmin, self).get_form(request, obj, **kwargs)


admin.site.register(ImageMedia, ImageMediaAdmin)
