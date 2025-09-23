from django.http import JsonResponse
from .models import Feature


def feature(request):
    if request.method == "GET":
        # For demo, just return one feature
        feature1 = Feature()
        feature1.id = 1
        feature1.name = "Tracking system"
        feature1.description = "It helps you who is tracking using his device."
        return JsonResponse({
            "id": feature1.id,
            "name": feature1.name,
            "description": feature1.description,
        })
    else:
        return JsonResponse({"error": "Invalid request method"}, status=400)
