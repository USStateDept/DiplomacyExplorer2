from django.db import models
from django.forms.models import model_to_dict
from layerinfo.widgets import LocationField

from jsonfield import JSONField

#this should be cached because it's giong ot called alot

class PointLayer(models.Model):
    layername = models.CharField(max_length=200, db_index=True)
    source = models.CharField(max_length=350, null=True, blank=True)

    def __unicode__(self):
        return u'%s' % (self.layername)

    def buildJSON(self):
        jsonobj = {"type":"FeatureCollection", "features":[],   "crs": {"type": "EPSG","properties": {"code": "4326"}}}
        points = self.points_set.all()
        for point in points:
            pointObj = model_to_dict(point)
            temppointobj = {"geometry": pointObj['geometry'], "properties":{}, "type":"Feature"}
            excludes = ["geometry", "pointlayer"]
            for pointpropkey in pointObj.keys():
                if pointpropkey not in excludes:
                    temppointobj['properties'][pointpropkey] = pointObj[pointpropkey]
            jsonobj['features'].append(temppointobj)
        return jsonobj

class Theme(models.Model):
    title = models.CharField(max_length=200, unique=True, db_index=True)
    description = models.TextField()
    keyid = models.CharField(max_length=200, unique=True, db_index=True)
    order = models.IntegerField(default=0)
    def __unicode__(self):
        return u'%s' % (self.title)



class Issue(models.Model):
    categoryName = models.CharField(max_length=200, db_index=True)
    categoryDescription = models.TextField()
    keyid = models.CharField(max_length=200, unique=True, db_index=True)
    theme = models.ForeignKey(Theme)

    def __unicode__(self):
        return u'%s' % (self.categoryName)




class Layer(models.Model):
    subject = models.CharField(max_length=200, db_index=True)
    description = models.TextField(null=True, blank=True)
    keyid = models.CharField(max_length=200, unique=True, db_index=True)
    issue = models.ForeignKey(Issue)
    labels = JSONField()
    jsonStyle = JSONField()
    ptsLayer = models.ForeignKey(PointLayer, null=True, blank=True)
    attribution = models.CharField(max_length=250, null=True, blank=True)
    isTimeSupported = models.BooleanField(default=False)
    timeSeriesInfo = JSONField(null=True)

    #this is {label:attribute name}


    def __unicode__(self):
        return u'%s' % (self.subject)

class Points(models.Model):
    Header = models.CharField(max_length=200, null=True, blank=True)
    Topic = models.ForeignKey(Layer, null=True, blank=True)
    Map = models.CharField(max_length=200, null=True, blank=True)
    Country = models.CharField(max_length=200, null=True, blank=True)
    Title = models.CharField(max_length=200, db_index=True)
    Story = models.TextField(null=True, blank=True)
    pointlayer = models.ForeignKey(PointLayer)
    #[125.6, 10.1] for geometry format --- potential for geoJSON object as well
    geometry = LocationField(blank=True)

    def __unicode__(self):
        return u'%s' % (self.Title)









