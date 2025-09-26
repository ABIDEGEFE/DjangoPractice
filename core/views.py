from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth.models import User

from .models import Feature


# def feature(request):
#     if request.method == "GET":
        
#         feature1 = Feature.objects.all().values('id', 'name', 'description')

#         return JsonResponse(
#             list(feature1), safe=False
#         )
#     else:
#         return JsonResponse({"error": "Invalid request method"}, status=400)
    
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

            user = User.objects.create_user(username=username, email=email, password=password1)
            return JsonResponse({"message": f"User {user.username} registered successfully!"})

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    print("hey this is", request.method)
    return JsonResponse({"error": "Invalid request method"}, status=405)
