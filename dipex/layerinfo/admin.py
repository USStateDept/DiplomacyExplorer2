from django.contrib import admin
from django import forms
import reversion

# Register your models here.
from layerinfo.models import Issue, Theme, Layer, PointLayer, Points


class IssueAdmin(admin.ModelAdmin):
    list_display = ('categoryName','theme',)
    #fieldsets =[(None,{'fields': ['categoryName']}),]



class ThemeAdmin(reversion.VersionAdmin):
    list_display = ('title',)
    #fieldsets =[(None,{'fields': ['theme']}),]


class LayerAdmin(reversion.VersionAdmin):
    list_display = ('subject', 'issue',)
    exclude = ('description_search',)
    #fieldsets =[(None,{'fields': ['subject']}),]

class PointLayerAdmin(reversion.VersionAdmin):
    list_display = ('layername',)

class PointsAdmin(reversion.VersionAdmin):
    list_display = ('Title', 'pointlayer',)



admin.site.register(Issue, IssueAdmin)
admin.site.register(Theme, ThemeAdmin)
admin.site.register(Layer, LayerAdmin)
admin.site.register(PointLayer, PointLayerAdmin)
admin.site.register(Points, PointsAdmin)



#one example of showing the drop down for the parentstuff
# def show_client_projects(obj):
#     project_list = [p.title for p in obj.project_set.all()]
#     return ', '.join(project_list)
# show_client_projects.short_description = 'Client Projects'
#
# # Custom ModelAdmin
# class ClientAdmin(admin.ModelAdmin):
#     list_display = ('title', 'show_client_projects')
