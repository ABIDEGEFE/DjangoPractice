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

