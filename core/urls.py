from django.urls import path

from . import views

# urlpatterns = [
#     path('', views.home, name='home'),
#     path('about/', views.about, name='about'),
#     path('counter', views.counter, name='counter'),
# ]

urlpatterns = [
    path('feature', views.feature, name='feature'),
    path('register', views.register, name='register'),
    path('delete', views.deleteUser, name='delete'),
    path('login', views.loginUser, name='login')
]
