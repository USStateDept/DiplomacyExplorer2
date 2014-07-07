from django.db import models

from jsonfield import JSONField

#this should be cached because it's giong ot called alot

class Theme(models.Model):
    title = models.CharField(max_length=200, unique=True)
    description = models.TextField()
    keyid = models.CharField(max_length=200, unique=True)
    order = models.IntegerField(default=0)

class Issue(models.Model):
    categoryName = models.CharField(max_length=200)
    categoryDescription = models.TextField()
    keyid = models.CharField(max_length=200, unique=True)
    theme = models.ForeignKey(Theme)


class Layer(models.Model):
    subject = models.CharField(max_length=200)
    description = models.TextField()
    keyid = models.CharField(max_length=200, unique=True)
    issue = models.ForeignKey(Issue)
    ptsLayer = models.CharField(max_length=200)
    labels = JSONField()
    jsonStyle = JSONField()



