from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
import json

from .models import Feature

# ✅ Feature endpoint: returns all features
def feature(request):
    if request.method == "GET":
        feature1 = Feature.objects.all().values('id', 'name', 'description')
        return JsonResponse(list(feature1), safe=False)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)

# ✅ Register endpoint: creates a new user
@csrf_exempt
def register(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            username = data.get("username")
            email = data.get("email")
            password1 = data.get("password1")
            password2 = data.get("password2")

            if password1 != password2:
                return JsonResponse({"error": "Passwords do not match"}, status=400)

            if User.objects.filter(username=username).exists():
                return JsonResponse({"error": "Username already taken"}, status=400)

            if User.objects.filter(email=email).exists():
                return JsonResponse({"error": "Email already taken."}, status=400)

            user = User.objects.create_user(username=username, email=email, password=password1)
            return JsonResponse({"message": f"User {user.username} registered successfully!"})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

# ✅ Delete endpoint: deletes user by email
@csrf_exempt
def deleteUser(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')

            if User.objects.filter(email=email).exists():
                User.objects.filter(email=email).delete()
                return JsonResponse({"message": f"User with {email} deleted successfully."})
            else:
                return JsonResponse({"error": f"User with {email} not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=400)

# ✅ Login endpoint: authenticates user by email and password
@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            password = data.get('password')

            # Find user by email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return JsonResponse({"message": "email not found"}, status=404)

            # Authenticate using username and password
            
            authenticated_user = authenticate(username=user.username, password=password)

            if authenticated_user is not None:
                return JsonResponse({"message":"success", "username": user.username, "email": user.email})
            else:
                return JsonResponse({"message": "failed"}, status=401)

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

    return JsonResponse({"message": "invalid request"}, status=400)