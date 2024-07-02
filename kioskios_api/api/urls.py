from django.urls import path
from . import views

urlpatterns = [
    path('forms_test/', views.forms_test, name='forms_test'),
    path('iniciar_sesion/', views.iniciar_sesion, name='iniciar_sesion'),
    path('cerrar_sesion/', views.cerrar_sesion, name='cerrar_sesion'),
    path('create_usuario/', views.create_usuario, name='create_usuario'),
    path('create_dueño/', views.create_dueño, name='create_dueño'),
    path('create_tienda/', views.create_tienda, name='create_tienda'),
    path('get_tiendas/', views.get_tiendas, name='get_tiendas'),
    path('create_producto/', views.create_producto, name='create_producto'),
    path('get_productos/', views.get_productos, name='get_productos'),
    path('create_venta/', views.create_venta, name='create_venta'),
    path('get_ventas/', views.get_ventas, name='get_ventas_dueño'),
]