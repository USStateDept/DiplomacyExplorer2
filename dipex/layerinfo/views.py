
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404
from django.http import Http404
from django.forms import model_to_dict

from layerinfo.models import Theme, Issue, Layer, Points, PointLayer

import urllib2

import json

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

        theme_issues = temptheme.issue_set.all()
        for theme_issue in theme_issues:
            output += "<h4><a style=\"color:#333\" class=\"mainKey\" name=\"" + theme_issue.keyid + "\">" + theme_issue.categoryName + "</a></h4>"

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
    issues = Issue.objects.all()
    for issue in issues:
        issuekey = issue.keyid

        mainObj[issuekey] = model_to_dict(issue)
        mainObj[issuekey]['layers'] = {}
        layers = issue.layer_set.all()
        for layer in layers:
            layerkey = layer.keyid
            
            mainObj[issuekey]['layers'][layerkey] = model_to_dict(layer)

    return json.dumps(mainObj)


def home(request):
    d = {}
    d['top_menu'] = buildTopMenu()
    d['theme_options'] = getThemeOptions()
    d['jsonObj'] = getJSONObj()

    return render(request, 'index.html', d)


def proxy(request):
    url = request.GET.get('url')
    type = request.GET.get('type', "application/json")
    #we may need to decode
    req = urllib2.Request(url)
    response = urllib2.urlopen(req)
    return HttpResponse(response.read(), mimetype=type)

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
    ptslayername = request.GET.get('layername', None)
    if not ptslayername:
        return json.dumps({})
    ptslayer = PointLayer.objects.get(layername__exact=ptslayername)
    if not ptslayer:
        return json.dumps({})
    return HttpResponse(json.dumps(ptslayer.buildJSON()), mimetype="application/json")



