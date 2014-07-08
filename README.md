DiplomacyExplorer2
==================

An upgrade to the US State Department's Diplomacy Explorer (http://diplomacy.state.gov/discoverdiplomacy/explorer/)

Install
===================

Download and Install:

*https://www.python.org/downloads/

*http://www.lfd.uci.edu/~gohlke/pythonlibs/#setuptools

*http://www.lfd.uci.edu/~gohlke/pythonlibs/#virtualenv

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
(dipex) C:\path\to\DiplomacyExRepo\dipex>python manage.py runserver

```

