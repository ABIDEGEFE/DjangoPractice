from core.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from core.serializers import UserSerializer
import jwt, datetime


SECRET_KEY = "secret"  # move to settings.py in production


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed("User not found")

        if not user.check_password(password):
            raise AuthenticationFailed("Incorrect password")

        # create payload
        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        # return token + user info
        serializer = UserSerializer(user)
        print("view serializer data:", serializer.data)
        return Response({
            "jwt": token,
            "user": serializer.data
        })


class UserView(APIView):
    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            raise AuthenticationFailed("No Authorization header")

        try:
            token = auth_header.split(" ")[1]  # Bearer <token>
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except Exception:
            raise AuthenticationFailed("Invalid token")

        user = User.objects.get(id=payload['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class DeleteView(APIView):
    def delete(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            raise AuthenticationFailed("No Authorization header")

        try:
            token = auth_header.split(" ")[1]  # Bearer <token>
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            print("payload:", payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except Exception:
            raise AuthenticationFailed("Invalid token")

        user = User.objects.get(id=payload['id'])
        user.delete()
        return Response({"message": f"User with id {payload['id']} deleted successfully."})
