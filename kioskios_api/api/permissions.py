from rest_framework.permissions import BasePermission
from django.core import serializers
from .models import ActiveSessions


def get_user(request):
    try:
        user = ActiveSessions.objects.get(session_key=request.get('token'))
        return user
    except:
        return None


class IsAuth(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_permission(self, request, view):
        print(get_user(request) is not None)
        return True


class IsAdmin(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_permission(self, request, view):
        print(get_user(request).tipo == 'AD')
        return True


class IsOwner(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_object_permission(self, request, view):
        print(get_user(request).tipo == 'DU')
        return True


class IsUser(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_object_permission(self, request, view):
        print(get_user(request).tipo == 'US')
        return True
