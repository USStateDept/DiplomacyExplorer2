from django.contrib import admin
from django import forms
import reversion

# Register your models here.
from layerinfo.models import Issue, Theme, Layer


class IssueAdmin(reversion.VersionAdmin):
    list_display = ('categoryName','theme',)
    #fieldsets =[(None,{'fields': ['categoryName']}),]



class ThemeAdmin(reversion.VersionAdmin):
    list_display = ('title',)
    #fieldsets =[(None,{'fields': ['theme']}),]


class LayerAdmin(reversion.VersionAdmin):
    list_display = ('subject', 'issue',)
    #fieldsets =[(None,{'fields': ['subject']}),]



admin.site.register(Issue, IssueAdmin)
admin.site.register(Theme, ThemeAdmin)
admin.site.register(Layer, LayerAdmin)



#one example of showing the drop down for the parentstuff
# def show_client_projects(obj):
#     project_list = [p.title for p in obj.project_set.all()]
#     return ', '.join(project_list)
# show_client_projects.short_description = 'Client Projects'
#
# # Custom ModelAdmin
# class ClientAdmin(admin.ModelAdmin):
#     list_display = ('title', 'show_client_projects')
