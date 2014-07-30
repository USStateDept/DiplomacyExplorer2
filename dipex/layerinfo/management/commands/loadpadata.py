from django.core.management.base import BaseCommand, CommandError
from layerinfo.models import Theme,Issue,Layer, PointLayer, Points

import json
from os import listdir
from os.path import isfile, join
import csv
import sys
from optparse import make_option
from geopy import geocoders
#from polls.models import Poll

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'
    option_list = BaseCommand.option_list + (make_option('--path',
            action='store', dest='basepath', default=None,
            help='The Path to the sql dir'),)


    def handle(self, *args, **options):


        #delete everything
        delitems = [Theme,Issue,Layer, PointLayer, Points]
        for delitem in delitems:
            delobjs = delitem.objects.all()
            for delobj in delobjs:
                print "deleting", delobj
                delobj.delete()


        BASE_DIR = options.get("basepath", None)
        if not BASE_DIR:
            print "Please provide the path to your SQL dir\nSuch as --path C:\\opengeo\\webapps\\DiplomacyExplorer2\\sql\\"
            sys.exit(1)


        pointscsvfile = "Points.csv"
        layerscsvfile = "Layers.csv"
        themescsvfile = "Themes.csv"
        issuescsvfile = "Issues.csv"


        pointsobj = []
        #load points, we are going ot get the point layers from the point.csv file
        #this will be the following format
        #pointlayername;header;topic;map;country;title;story;lat;lon;locationname
        with open(BASE_DIR + pointscsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f, delimiter=',')
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    pointsobj.append(dict(zip(headers, row)))

        g = geocoders.GoogleV3()
        #create pointlayer
        for pointobj in pointsobj:
            temppointlayer, created = PointLayer.objects.get_or_create(layername=pointobj['pointlayername'])
            print temppointlayer
            #build the point
            temppoint, created = Points.objects.get_or_create(Title=pointobj['title'],pointlayer=temppointlayer)


            if (pointobj['lon'] != "" and pointobj['lat'] != ""):
                try:
                    temppoint.geometry = [float(pointobj['lon']),float(pointobj['lat'])]
                except Exception, e:
                    print e

            elif (pointobj['locationname'] != ""):
                place, (lat,lon) = g.geocode(pointobj['locationname'])
                print "geocoded", pointobj['locationname'], "to", lat,lon
                print temppoint
                temppoint.geometry = [lon, lat]
            else:
                print "Could not find the location for ", pointobj['pointlayername']
                temppoint.delete()
            if temppoint:
                temppoint.Header = pointobj['header']
                temppoint.Topic = pointobj['topic']
                temppoint.Map = pointobj['map']
                temppoint.Country = pointobj['country']
                temppoint.Story = pointobj['story']
                temppoint.save()



        layersobj = []
        themesobj = []
        issuesobj = []

        #need to do this order themes, issues and layers

        with open(BASE_DIR + layerscsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f, delimiter=';')
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    layersobj.append(dict(zip(headers, row)))

        with open(BASE_DIR + themescsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f, delimiter=',')
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    themesobj.append(dict(zip(headers, row)))

        with open(BASE_DIR + issuescsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f, delimiter=';')
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    issuesobj.append(dict(zip(headers, row)))



        #get the temes

        #get the themes
        counter = 1
        for themerow in themesobj:
            print "working on theme ", themerow['ThemeID']
            #Name,Description,KeyID,ThemeID,ThemeDrop
            currenttheme, created = Theme.objects.get_or_create(keyid=themerow['ThemeID'])
            print currenttheme, created
            currenttheme.title = themerow['Name']
            currenttheme.description = themerow['Description']
            currenttheme.keyid = themerow['ThemeID']
            currenttheme.order = counter
            counter +=1
            currenttheme.save()

        for issuerow in issuesobj:
            #Name,Description,KeyID,ThemeID,ID
            try:
                themeobj = Theme.objects.get(keyid__exact=issuerow['ThemeID'])
            except:
                print "could not find themeobj for ", issuerow['KeyID']
            else:

                currentissue, created = Issue.objects.get_or_create(keyid=issuerow['KeyID'], theme=themeobj)
                print currentissue, created
                currentissue.categoryName = issuerow['Name']
                currentissue.categoryDescription = issuerow['Description']
                currentissue.keyid = issuerow['KeyID']
                currentissue.save()

        for layerrow in layersobj:
            #Name,Description,KeyID,Labels,IssueID,jsonStyle,PtsLayer,Attribution
            try:
                issueobj = Issue.objects.get(keyid__exact=layerrow['IssueID'])
            except:
                print "could not find issueobj for ", layerrow['KeyID']
            else:

                currentlayer,created = Layer.objects.get_or_create(keyid=layerrow['KeyID'], issue=issueobj)
                print currentlayer, created
                currentlayer.subject = layerrow['Name']
                currentlayer.description = layerrow['Description']
                currentlayer.keyid = layerrow['KeyID']
                currentlayer.labels = layerrow['Labels']
                currentlayer.jsonStyle = layerrow['jsonStyle']
                try:
                    temppointlayer = PointLayer.objects.get(layername__exact=layerrow['PtsLayer'])
                    currentlayer.ptsLayer = temppointlayer
                except:
                    pass
                currentlayer.attribution = layerrow['Attribution']
                print "****layerrow", layerrow['isTimeSupported']
                currentlayer.isTimeSupported = True if str(layerrow['isTimeSupported']) == "TRUE" else False
                if layerrow['isTimeSupported'] == "TRUE":
                    currentlayer.timeSeriesInfo = layerrow['timeSeriesInfo']
                else:
                    currentlayer.timeSeriesInfo = {}
                currentlayer.save()



        #now let's test

        print "*********we now have the following"
        themes = Theme.objects.all()
        print "we have ", len(themes), "Themes"
        for theme in themes:
            issues = theme.issue_set.all()
            print "\t", theme.title, "has ", len(issues), "issues"
            for issue in issues:
                layers = issue.layer_set.all()
                print "\t\t", issue.categoryName, "has", len(layers), "Layers"
                for layer in layers:
                    print "\t\t\tIt has", layer.subject
                    pointlayer = layer.ptsLayer
                    if pointlayer:
                        print "\t\t\t\tIt has ", pointlayer.layername
                        points = pointlayer.points_set.all()
                        print "\t\t\t\t", pointlayer.layername, "has", len(points)


