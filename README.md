DiplomacyExplorer2
==================

An upgrade to the US State Department's Diplomacy Explorer (http://diplomacy.state.gov/discoverdiplomacy/explorer/)

Install
===================

Download and Install:

*[Python 2.7.7](https://www.python.org/downloads/)

*[Pip](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pip)

*[Python Setup Tools](http://www.lfd.uci.edu/~gohlke/pythonlibs/#setuptools)

*[Python Virtual Environment](http://www.lfd.uci.edu/~gohlke/pythonlibs/#virtualenv)

*[the "requiredlibrary" of this repo](https://github.com/USStateDept/DiplomacyExplorer2/tree/master/requiredlibrary) or [Pillow-2.5.1.win32-py2.7.exe or the 64bit version](http://www.lfd.uci.edu/~gohlke/pythonlibs/#pillow)

Then open command prompt

First Run

```

#make virtualenv
C:\some\folder\>mkdir virtualenvs
c:\some\folder\>cd virtualenvs
c:\some\folder\virtualenvs>virtualenv dipex
c:\some\folder\virtualenvs>dipex\Scripts\activate
(dipex) c:\some\folder\virtualenvs>cd C:\path\to\DiplomacyExRepo\dipex
(dipex) C:\path\to\DiplomacyExRepo\dipex> pip install -r requirements.txt
Might have to use git bash for this
(dipex) C:\path\to\DiplomacyExRepo\dipex>git submodule init
(dipex) C:\path\to\DiplomacyExRepo\dipex>git submodule update
(dipex) C:\path\to\DiplomacyExRepo\dipex>python manage.py buildwatson
(dipex) C:\path\to\DiplomacyExRepo\dipex>python manage.py installwatson
(dipex) C:\path\to\DiplomacyExRepo\dipex>python manage.py runserver


```

Update Dataset
==============================

Update the json file dipex/layerinfo/static/data/DiscoverDiplomacy-Data_50m.json using QGIS 

Save as a geoJSON

Install [TopoJSON](https://github.com/mbostock/topojson)If you don't already have it

*Install NodeJS

```
npm -g topojson
```

*Navigate to the DiscoverDiplomacy-Data_50m.json directory and run 

```
topojson -o DiscoverDiplomacy-Topo_50m.json --no-stitch-poles -p -- DiscoverDiplomacy-Data_50m.json
```



