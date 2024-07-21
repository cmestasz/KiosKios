from rest_framework.permissions import BasePermission
from .models import ActiveSessions


def get_user(request):
    try:
        print(request.data)
        user = ActiveSessions.objects.get(session_key=request.data.get('token'))
        return user
    except:
        return None


class IsAuth(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_permission(self, request, view):
        print(get_user(request) is not None)
        return get_user(request) is not None


class IsAdmin(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_permission(self, request, view):
        print(get_user(request).tipo == 'AD')
        return get_user(request).tipo == 'AD'


class IsOwner(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_object_permission(self, request, view):
        print(get_user(request).tipo == 'DU')
        return get_user(request).tipo == 'DU'


class IsUser(BasePermission):
    message = 'No tienes los permisos necesarios para realizar esta acción.'

    def has_object_permission(self, request, view):
        print(get_user(request).tipo == 'US')
        return get_user(request).tipo == 'US'
