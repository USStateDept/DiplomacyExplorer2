from django.core.management.base import BaseCommand, CommandError
from layerinfo.models import Theme,Issue,Layer

import json
from os import listdir
from os.path import isfile, join
#from polls.models import Poll

class Command(BaseCommand):
    help = 'Closes the specified poll for voting'

    def add_arguments(self, parser):
#        parser.add_argument('poll_id', nargs='+', type=int)
        return

    def handle(self, *args, **options):
        BASE_DIR = "C:\\opengeo\\webapps\\DiplomacyExplorer2\\jsonFile\\"
        THEME_DIR = BASE_DIR + "themefolder\\"


        #get the themes

        for themefile in listdir(THEME_DIR):
            if isfile(join(THEME_DIR, themefile)):
                #add to the object
                with open(join(THEME_DIR, themefile), 'r') as f1:
                    keyid = themefile.replace(".json", "")
                    print "working on ", keyid
                    tempthemeobj = json.load(f1)
                    try:
                        currentthemes = Theme.objects.get(keyid__exact=keyid)
                        print currentthemes
                    except:
                        currentthemes = None
                    if not currentthemes:
                        print tempthemeobj
                        newthemeobj = Theme(title=tempthemeobj['title'], description=tempthemeobj['description'], keyid=keyid, order=int(tempthemeobj['order']))
                        print tempthemeobj['issues']
                        newthemeobj.save()
                    else:
                        newthemeobj = currentthemes

                    for issuekey in tempthemeobj['issues'].keys():
                        #try:
                        try:
                            with open(BASE_DIR + issuekey + ".json", 'r') as subf:
                                print "got ", BASE_DIR + issuekey + ".json"
                                tempissueobj = json.load(subf)
                                newissueobj = Issue(categoryName=tempissueobj['categoryName'], categoryDescription=tempissueobj['categoryDescription'], keyid=issuekey, theme=newthemeobj)
                                newissueobj.save()
                        except Exception, e:

                            print "failed to load", issuekey, e

        #getting everything with over 2 keys
        for otherfile in listdir(BASE_DIR):
            if isfile(join(BASE_DIR, otherfile)):
                splitfile = otherfile.replace(".json", "").split("_")
                if len(splitfile) > 1:
                    issuekey = splitfile[0]
                    layerkey = splitfile[1]
                    print "working on layer", issuekey, layerkey


                    with open(join(BASE_DIR, otherfile), 'r') as f2:
                        templayerobj = json.load(f2)
                        try:
                            theissueobj = Issue.objects.get(keyid__exact=issuekey)
                        except:
                            theissueobj = None
                        if not theissueobj:
                            print "could not find the issue obj", issuekey
                            continue
                        newlayerobj = Layer(subject=templayerobj['subject'], description=templayerobj['description'], keyid=layerkey, ptsLayer=templayerobj['ptsLayer'], labels=templayerobj['labels'], jsonStyle=templayerobj['jsonStyle'],issue=theissueobj)
                        newlayerobj.save()

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
