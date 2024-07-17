from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.' 

  def has_permission(self, request, view):
    return request.user and request.user.tipo == 'AD'

class IsOwner(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.'

  def has_object_permission(self, request, view):
    return request.user and request.user.tipo == 'DU' 
  
class IsUser(BasePermission):
  message = 'No tienes los permisos necesarios para realizar esta acción.'

  def has_object_permission(self, request, view):
    return request.user and request.user.tipo == 'US'
  
