from django.urls import path
from . import views

urlpatterns = [
    path('forms_test/', views.forms_test, name='forms_test'),
    path('create_usuario/', views.create_usuario, name='create_usuario'),
    path('create_dueño/', views.create_dueño, name='create_dueño'),
    path('create_tienda/', views.create_tienda, name='create_tienda'),
    path('create_producto/', views.create_producto, name='create_producto'),
    path('create_venta/', views.create_venta, name='create_venta'),
]