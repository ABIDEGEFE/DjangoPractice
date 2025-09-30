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
----

## 🔐 User Authentication: Register and Login

This section outlines how to implement user registration and login functionality using a React frontend and Django backend.

---

### 📝 Register

Users can register using their **email**, **username**, and **password**. The frontend collects these credentials and sends them to the backend via a `POST` request.

#### 📦 Frontend (React)

```tsx
const response = await fetch('http://127.0.0.1:8000/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, email, password })
});

const data = await response.json();
```

#### 🐍 Backend (Django)

```python
import json
from django.http import JsonResponse
from django.contrib.auth.models import User

data = json.loads(request.body.decode('utf-8'))
username = data.get('username')
email = data.get('email')
password = data.get('password')

User.objects.create_user(username=username, email=email, password=password)

return JsonResponse({'message': 'User registered successfully'})
```

---

### 🔑 Login

The login flow is similar to registration. The frontend collects the user's **email** and **password**, and sends them to the backend for authentication.

#### 📦 Frontend (React)

```tsx
const response = await fetch('http://127.0.0.1:8000/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
```

#### 🐍 Backend (Django)

```python
import json
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

data = json.loads(request.body.decode('utf-8'))
email = data.get('email')
password = data.get('password')

try:
    # finding user using is email
    user = User.objects.get(email=email)
except User.DoesNotExist:
    return JsonResponse({"error": "Email not found"}, status=404)

# check whether user is authenticated or not
auth_user = authenticate(username=user.username, password=password)
if auth_user is not None:
    return JsonResponse({"message": "Login successful", "username": user.username})
else:
    return JsonResponse({"error": "Invalid credentials"}, status=401)
```

---

## 🌐 Accessing Public Databases via API

In many applications, it's unnecessary to store all external data locally. Instead, we can retrieve real-time information from public APIs hosted on the internet. For example, weather data can be accessed directly from services like [weather.com](https://weather.com) using an API key.

This approach allows us to:
- Reduce database storage requirements
- Access up-to-date information
- Integrate third-party data seamlessly into our frontend/backend workflows

---

## 🔄 Workflow: React to Django to Public API

### 1. **React Frontend: Send City Name to Django**

```jsx
const response = await fetch('http://127.0.0.1:8000/weather', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ city })
});

const data = await response.json();
setData(data);
```

---

### 2. **Django Backend: Forward City Name to Public API**

```python
import json
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def weather(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            city = data.get('city')
            api_key = 'your_api_key_here'  # Replace with your actual API key
            url = f'http://weather.api?key={api_key}&q={city}'

            response = requests.get(url)
            weather_data = response.json()

            if 'error' in weather_data:
                return JsonResponse({"error": weather_data['error']['message']}, status=400)

            weather_info = {
                'city': city,
                'location': weather_data['location']['name'],
                'temperature': weather_data['current']['temperature']
            }

            return JsonResponse(weather_info)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)
```

> 💡 Make sure to install the `requests` library:
```bash
pip install requests
```











    

   

