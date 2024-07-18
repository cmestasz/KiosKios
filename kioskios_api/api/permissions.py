from rest_framework.permissions import BasePermission

class IsAuth(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.' 

  def has_permission(self, request, view):
    return request.session['is_authenticated'] == 1

class IsAdmin(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.' 

  def has_permission(self, request, view):
    return request.session['user'] and request.session['user'].tipo == 'AD'

class IsOwner(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.'

  def has_object_permission(self, request, view):
    return request.session['user'] and request.session['user'].tipo == 'DU'
  
class IsUser(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.'

  def has_object_permission(self, request, view):
    return request.session['user'] and request.session['user'].tipo == 'US'
  
