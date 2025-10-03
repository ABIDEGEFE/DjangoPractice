from django.urls import path
from myProject.views import LoginView, UserView, DeleteView
from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
#     path('about/', views.about, name='about'),
#     path('counter', views.counter, name='counter'),
# ]

urlpatterns = [
    path('feature', views.feature, name='feature'),
    # path('register', RegisterView.as_view(), name='register'),
    path('delete', DeleteView.as_view(), name='delete'),
    path('login', LoginView.as_view(), name='login'),
    path('weather', views.weatherInfo, name='weather'),
    path('user', UserView.as_view(), name='user'),
    
]
