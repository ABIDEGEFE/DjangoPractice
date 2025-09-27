## 🛠️ Admin Panel, Models, and Database Migrations

This guide outlines how to set up Django models, register them with the admin panel, and expose data to the frontend.

---

### 📦 1. Define Your Model

Create a model class inside `models.py`:

```python
from django.db import models

class ModelClass(models.Model):
    # Define your fields here
    name = models.CharField(max_length=100)
```

---

### ⚙️ 2. Register Your App in `settings.py`

Ensure your app (folder containing `models.py`) is listed in `INSTALLED_APPS`:

```python
INSTALLED_APPS = [
    'your_app_name',
    # other apps...
]
```

---

### 🗃️ 3. Apply Migrations

Generate and apply migrations to sync your models with the database:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 👤 4. Create a Superuser for Admin Panel

Set up an admin account to access the Django admin interface:

```bash
python manage.py createsuperuser
# Follow the prompts to enter username, email, and password
```

---

### 🧾 5. Register Models in `admin.py`

Make your models manageable via the admin dashboard:

```python
from django.contrib import admin
from .models import ModelClass

admin.site.register(ModelClass)
```

---

### 📥 6. Retrieve Model Data

Query all objects from your model:

```python
md = ModelClass.objects.all()  # Returns a queryset of all records
```

---

### 🌐 7. Return Data to Frontend

Use Django’s `JsonResponse` to send data to the frontend:

```python
from django.http import JsonResponse

def get_data(request):
    md = ModelClass.objects.all()
    return JsonResponse(list(md.values()), safe=False)
```

> ✅ Note: `safe=False` allows you to return a list instead of a dictionary.

---

## 📚 Lesson 5: How to Register and Delete Users

This lesson demonstrates how to implement user registration and deletion using a React frontend and Django backend. It covers the request flow, data handling, and integration between both layers.

---

### 🧑‍💻 Frontend (React): User Registration

To register a user, send a `POST` request with the required credentials:

```tsx
const response = await fetch('http://127.0.0.1:8000/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    username,
    email,
    password
  })
});

const data = await response.json();
```

---

### 🐍 Backend (Django): Handle Registration

```python
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
import json

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')

        User.objects.create_user(username=username, email=email, password=password)
        return JsonResponse({"message": "User registered successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)
```

---

### 🧑‍💻 Frontend (React): Delete User

To delete a user by email, send a `DELETE` request:

```tsx
const response = await fetch('http://127.0.0.1:8000/delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email
  })
});

const data = await response.json();
```

---

### 🐍 Backend (Django): Handle Deletion

```python
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth.models import User
import json

@csrf_exempt
def deleteUser(request):
    if request.method == 'DELETE':
        data = json.loads(request.body.decode('utf-8'))
        email = data.get('email')

        User.objects.filter(email=email).delete()
        return JsonResponse({"message": f"User with email {email} deleted successfully."})
    else:
        return JsonResponse({"error": "Invalid request method."}, status=400)
```






    

   

