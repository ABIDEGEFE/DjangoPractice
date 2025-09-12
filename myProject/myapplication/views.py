from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def home(request):
    return HttpResponse('<h1>Welcome to the Home Page</h1>')

def about(request):
    return HttpResponse('<h1>About Us</h1><p>This is the about page.</p>')