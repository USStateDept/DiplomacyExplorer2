
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.forms import model_to_dict
from django.conf import settings
from lockdown.decorators import lockdown
from django.views.decorators.csrf import csrf_exempt

from layerinfo.models import Theme, Issue, Layer, Points, PointLayer

import urllib2

import json
import watson
from dateutil.parser import *

# Create your views here.

def buildTopMenu():
    output = ""
    topthemes = Theme.objects.order_by('order').all()
    print len(topthemes)

    for temptheme in topthemes:

        output += "<li class=\'dropdown\'>"
        output += "<a id='" + temptheme.keyid + "' href=\"#\" role=\"button\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">" + temptheme.title + "</a>"
        output += "<ul class=\"dropdown-menu\" style=\"padding:10px;\">"
        output += "<h4><small>" + temptheme.description + "</small></h4>"

        theme_issues = temptheme.issue_set.order_by('categoryName').all()
        for theme_issue in theme_issues:
            output += "<a style=\"color:#333\" class=\"mainKey " + temptheme.keyid + "\" name=\"" + theme_issue.keyid + "\" class=\"" + temptheme.keyid + "\"><h4>" + theme_issue.categoryName + "</h4></a>"

        output += "</ul>"
        output += "</li>"

    return output

def getThemeOptions():
    output = ""
    topthemes = Theme.objects.order_by('order').all()
    for temptheme in topthemes:
        output += "<option value='" + temptheme.keyid + "'>" + temptheme.title + "</option>"
    return output


def getJSONObj():
    mainObj = {}
    issues = Issue.objects.order_by('categoryName').all()
    for issue in issues:
        issuekey = issue.keyid

        mainObj[issuekey] = model_to_dict(issue)
        mainObj[issuekey]['layers'] = {}
        layers = issue.layer_set.order_by('subject').all()
        #order layers
        for layer in layers:
            layerkey = layer.keyid

            mainObj[issuekey]['layers'][layerkey] = model_to_dict(layer)

    return json.dumps(mainObj)

@lockdown(passwords=('test',))
@csrf_exempt
def home(request):
    d = {}
    d['top_menu'] = buildTopMenu()
    d['theme_options'] = getThemeOptions()
    d['jsonObj'] = getJSONObj()
    d['BASE_URL'] = settings.BASE_URL

    return render(request, 'index.html', d)


def proxy(request):
    url = request.GET.get('url')
    type = request.GET.get('type', "application/json")
    #we may need to decode
    req = urllib2.Request(url)
    response = urllib2.urlopen(req)
    return HttpResponse(response.read(), content_type=type)

def combobox(request):
    type = request.POST.get('type')
    name = request.POST.get('name')

def ajaxPost(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)

        if form.is_valid():
            user = User.objects.create_user(
                form.cleaned_data["username"],
                form.cleaned_data["email"],
                form.cleaned_data["password"])
            models.UserProfile.objects.create(user=user)
            user_authenticated = auth.authenticate(
                username=form.cleaned_data["username"],
                password=form.cleaned_data["password"])
            auth.login(request, user_authenticated)
            return HttpResponseRedirect('/')
    else:
        form = RegisterForm()

    return render(request, 'register.html', {'form': form})


def geoJson(request):
    ptslayername = request.GET.get('layerid', None)
    if not ptslayername:
        return json.dumps({})
    ptslayer = PointLayer.objects.get(id__exact=ptslayername)
    if not ptslayer:
        return json.dumps({})
    return HttpResponse(json.dumps(ptslayer.buildJSON()), content_type="application/json")


def searchLayers(request):
    querystring = request.GET.get('q', None)
    print querystring
    search_results = watson.search(querystring)
    resultobj = []
    counter = 1
    for result in search_results:
        resultobj.append({"subject": result.object.subject, "keyid":result.object.issue.keyid + "+" + result.object.keyid})
        if counter > 10:
            break
        counter +=1

    return HttpResponse(json.dumps(resultobj), content_type="application/json")


def externalSources(request):
    url = request.GET.get('url')
    type = request.GET.get('type', "unjson")
    #we may need to decode
    req = urllib2.Request(url)
    response = urllib2.urlopen(req)

    #transform
    if type == "unjson":
        geojson = {"type":"FeatureCollection", "features":[]}
        try:
            jsonobj = json.loads(response.read())
        except:
            print "could not load JSON object"
            return HttpResponse("{}", content_type="application/json")

        for feature in jsonobj:
            if (float(feature['longitude']) == 0 and float(feature['latitude']) == 0):
                continue
            featureobj = {"type":"Feature", "properties":{"name":feature['name']}, "geometry":{"type":"Point", "coordinates":[feature['longitude'], feature['latitude']]}}
            if len(feature['population']) > 0:
                if feature['population'][0]["value"]:
                    featureobj['properties']['value'] = feature['population'][0]['value']
                if feature['population'][0]["updated_at"]:
                    featureobj['properties']['updated_at'] = parse(feature['population'][0]['updated_at']).strftime("%b %d, %Y")

            geojson['features'].append(featureobj)



    return HttpResponse(json.dumps(geojson), content_type="application/json")



