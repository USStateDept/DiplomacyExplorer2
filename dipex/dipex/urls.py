from django.conf.urls import patterns, include, url
from django.conf import settings
from django.views.generic import RedirectView

from django.contrib import admin
admin.autodiscover()

import layerinfo

urlpatterns = patterns('',
    # Examples:
    #url(r'^' + settings.BASE_URL + '$', 'layerinfo.views.home', name='home'),
    (r'^' + settings.BASE_URL + '$', RedirectView.as_view(url='/' + settings.BASE_URL + '/')),
    url(r'^' + settings.BASE_URL + '/$', 'layerinfo.views.home', name='home'),
    url(r'^' + settings.BASE_URL + '/proxy$', 'layerinfo.views.proxy', name='proxy'),
    url(r'^' + settings.BASE_URL + '/geojson$', 'layerinfo.views.geoJson', name='proxy'),
    #url(r'^' + settings.BASE_URL + '/Combo$', 'layerinfo.views.combobox', name='proxy'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^' + settings.BASE_URL + '/layerinfo', include('layerinfo.urls')),
    url(r'^' + settings.BASE_URL + '/admin/', include(admin.site.urls)),
    (r'^' + settings.BASE_URL + '/tinymce/', include('tinymce.urls')),
)



from django.conf import settings

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^' + settings.BASE_URL + '/media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
