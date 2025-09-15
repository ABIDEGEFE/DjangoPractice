# 📝 Django & Django REST Framework Practice Log

This repository is created to record regular practice in **Django** and **Django REST Framework**, focusing on backend-to-frontend communication and request handling.

---

## 📚 Lesson Two

### 🔄 How to Pass Dynamic Values to the Frontend

We can pass dynamic values from the backend to the frontend using a dictionary in the `render()` function:

```python
# views.py
def home(request):
    return render(request, 'home.html', {"name": "mamo"})
```

In your `home.html` template:

```html
<h1>Hey, {{ name }}</h1>
```

✅ The template engine will replace `{{ name }}` with `"mamo"` dynamically.

---

### 📤 How to Send Data from Frontend to Backend

To send data from the frontend to the backend:

- The backend must check the **request method** (e.g., GET or POST).
- You can retrieve data using:
  
  ```python
  data = request.GET.get('data')  # For GET requests
  ```

- The frontend form must specify the correct route and method:

```html
<form action="/backend_route" method="GET">
  <input type="text" name="data" />
  <button type="submit">Send</button>
</form>
```
---

# 📘 LESSON 3: Django Security & Static Files

This lesson covers two key concepts in Django development: **CSRF protection** and **static file configuration**, especially when integrating with external frontend stacks like React.

---

## 🔐 What is CSRF?

**CSRF** stands for **Cross-Site Request Forgery** — a type of attack where malicious users attempt to submit unauthorized requests to a site where you're already authenticated, potentially corrupting or manipulating your stored data.

To prevent this, **Django assigns a CSRF token** to each session. This token is checked every time a request attempts to interact with the backend, ensuring that the request originates from a trusted source.

---

## 🗂️ How to Let Django Know Where Static Files Are Located

### ✅ For Native Django Templates

After creating a `static/` folder, configure your `settings.py` like this:

```python
import os

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

STATIC_URL = '/static/'
```

In your HTML templates, load and use static files like this:

```html
{% load static %}
<link rel="stylesheet" href="{% static 'style.css' %}">
```

---

### ⚛️ For External Frontend Stacks (e.g., React)

If you're using a separate frontend (like React), you should **not** use `{% static %}` inside React files. Instead, configure Django to locate the built static assets:

```python
import os

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'FrontEnd', 'build', 'static'),
]
```

This allows Django to serve React’s compiled assets (CSS, JS, images) from the correct location.

---





