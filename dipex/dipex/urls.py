from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import layerinfo

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'layerinfo.views.home', name='home'),
    url(r'^proxy$', 'layerinfo.views.proxy', name='proxy'),
    url(r'^geojson$', 'layerinfo.views.geoJson', name='proxy'),
    url(r'^Combo$', 'layerinfo.views.combobox', name='proxy'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^layerinfo', include('layerinfo.urls')),
    url(r'^admin/', include(admin.site.urls)),
    (r'^tinymce/', include('tinymce.urls')),
)



from django.conf import settings

if settings.DEBUG:
    # static files (images, css, javascript, etc.)
    urlpatterns += patterns('',
        (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
        'document_root': settings.MEDIA_ROOT}))
