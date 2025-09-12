**LESSON 1 URLS**
----
To start an app under a main project run:
    python manage.py startapp myApplication

Route is a specific path which navigate us towards specific page. Eg, about/, /message

There will be a file called urls.py in both main project and application directory.
   * In application.urls, we will create routes. Eg, path('about/', views.about, name='about')
   * In Project.urls, we will include application.urls. Eg, path('', include('application.urls'))


Virtual environment is a dedicated space which is separated from the main computer for the purpose of storing packages and necessary components for our project.
* To install virtual environment based on our need, run:<br>
pip install virtualenvwrapper
* To create our virtual environment, run:<br>
mkvirtualenv my-environment
* To activate the virtual environment, run:<br>
workon my-environment
* To deactivate the virtual environment, run:<br>
deactivate
  
