from django.db import models
from django.contrib.auth.models import AbstractUser

# # Create your models here.
# class Feature(models.Model):
#     name = models.CharField(max_length=100)
#     description = models.CharField(max_length=500)
#     status = models.CharField(max_length=100, default='none')


# class Student(models.Model):
#     name = models.CharField(max_length=100)
#     age = models.IntegerField()
#     grade = models.CharField(max_length=10)
#     date_enrolled = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return str(self.age)
    
class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    # is_licensed = models.BooleanField(default=False)
    # status = models.CharField(max_length=100, default='none')
    # wins = models.IntegerField(default=0)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []