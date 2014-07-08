from django.core.management.base import BaseCommand, CommandError
from layerinfo.models import PointLayer, Points, Layer
from optparse import make_option

import json
import sys
#from polls.models import Poll

class Command(BaseCommand):
    help = 'This will take whatever is available '
    option_list = BaseCommand.option_list + (make_option('--jsonurl',
                    action='store', dest='jsonurl',
                    help='This will fetch the jsonurl and store it in the model'),)
    option_list = option_list + (make_option('--jsonfile',
            action='store', dest='jsonfile', default=None,
            help='Full name to the server'),)
    option_list = option_list + (make_option('--layername',
            action='store', dest='layername', default=None,
            help='The name of the layer'),)


    def handle(self, *args, **options):

        layername = options.get('layername', None)
        if not layername:
            print "You must declare the --layername arg"
            sys.exit(1)

        jsonurl = options.get('jsonurl', None)
        jsonfile = options.get('jsonfile', None)

        jsonText = ""
        if jsonurl:
            try:
                type = request.GET.get('type', "application/json")
                req = urllib2.Request(jsonurl)
                response = urllib2.urlopen(req)
                jsonObj = json.loads(HttpResponse(response.read(), mimetype=type))
            except Exception, e:
                print "Failed to fetch URL"
                print e
                sys.exit(1)
        elif jsonfile:
            try:
                print jsonfile
                with open(jsonfile, 'r') as f:
                    jsonObj = json.load(f)
            except Exception, e:
                print "failed to load the JSON file"
                print e
                sys.exit(1)

        else:
            print "You must declare a --jsonurl or a --jsonfile to continue"
            sys.exit(1)

        thepointlayer = PointLayer(layername=layername)
        print "saved the pointlayer", thepointlayer
        thepointlayer.save()

        for feature in jsonObj['features']:
            if ( not feature['geometry'] or "Title" not in feature['properties']):
                print "skipping the feature", feature
                continue
            point = Points(geometry=feature['geometry'], pointlayer=thepointlayer)
            point.Header = feature['properties']['Header'] if "Header" in feature['properties'] else None
            if "Topic" in feature['properties']:
                #get the layer
                thelayer = Layer.objects.filter(subject__exact=feature['properties']['Topic'])
                if thelayer:
                    point.Topic = thelayer
                else:
                    point.Topic = None
            point.Map = feature['properties']['Map'] if "Map" in feature['properties'] else None
            point.Country = feature['properties']['Country'] if "Country" in feature['properties'] else None
            point.Title = feature['properties']['Title'] if "Title" in feature['properties'] else None
            point.Story = feature['properties']['Story'] if "Story" in feature['properties'] else None
            point.save()
            print "\tsaved the point", point



