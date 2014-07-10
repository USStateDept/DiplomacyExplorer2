from django.core.management.base import BaseCommand, CommandError
from layerinfo.models import Theme,Issue,Layer, PointLayer

import json
from os import listdir
from os.path import isfile, join
import csv
import sys
#from polls.models import Poll

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'
    option_list = BaseCommand.option_list + (make_option('--path',
            action='store', dest='basepath', default=None,
            help='The Path to the sql dir'),)


    def handle(self, *args, **options):
        BASE_DIR = options.get("basepath", None)
        if not BASE_DIR:
            print "Please provide the path to your SQL dir\nSuch as --path C:\\opengeo\\webapps\\DiplomacyExplorer2\\sql\\"
            sys.exit(1)

        layerscsvfile = "Layers.csv"
        themescsvfile = "Themes.csv"
        issuescsvfile = "Issues.csv"

        layersobj = []
        themesobj = []
        issuesobj = []

        #need to do this order themes, issues and layers

        with open(BASE_DIR + layerscsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f)
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    layersobj.append(dict(zip(headers, row)))

        with open(BASE_DIR + themescsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f)
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    themesobj.append(dict(zip(headers, row)))

        with open(BASE_DIR + issuescsvfile, 'rb') as f:
            headers = []
            tempreader = csv.reader(f)
            for row in tempreader:
                if len(headers) == 0:
                    headers = row
                else:
                    issuesobj.append(dict(zip(headers, row)))



        #get the temes

        #get the themes

        for themerow in themesobj:
            print "working on theme ", themerow['keyid']

            currenttheme = Theme.objects.get_or_create(keyid__exact=themerow['keyid'])
            currenttheme.title = themerow['title']
            currenttheme.description = themerow['description']
            currenttheme.keyid = themerow['keyid']
            currenttheme.order = int(tempthemeobj['order'])

        for issuerow in issuesobj:
            try:
                themeobj = Theme.objects.get(keyid__exact=issuerow['ThemeID'])
            except:
                print "could not find themeobj for ", issuerow['keyid']
            else:
                currentissue = Issue.objects.get_or_create(keyid__exact=issuerow['keyid'])
                currentissue.categoryName = issuerow['title']
                currentissue.categoryDescription = issuerow['description']
                currentissue.keyid = issuerow['keyid']
                currentissue.theme = themeobj

        for layerrow in layersobj:
            try:
                issueobj = Issue.objects.get(keyid__exact=layerrow['issueID'])
            except:
                print "could not find themeobj for ", layerrow['keyid']
            else:
                currentlayer = Layer.objects.get_or_create(keyid__exact=layerrow['keyid'])
                currentlayer.subject = layerrow['title']
                currentlayer.description = layerrow['description']
                currentlayer.keyid = layerrow['keyid']
                currentlayer.labels = layerrow['']
                currentlayer.jsonStyle = layerrow['title']
                currentlayer.issue = issueobj
                currentlayer.attribution = layerrow['keyid']
                currentlayer.isTimeSupported = layerrow['layerrow']
                currentlayer.timeSeriesInfo = layerrow['layerrow']
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
