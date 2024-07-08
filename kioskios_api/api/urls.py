from django.urls import path
from . import views
from rest_framework import routers
from .viewsets import UsuarioViewSet, TiendaViewSet, ProductoViewSet, VentaViewSet
from django.urls import include

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'tiendas', TiendaViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'ventas', VentaViewSet)


urlpatterns = [
    path('rest/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('test_get_usuarios/', views.TestUsuarios.as_view(), name='test_get_usuarios'),
    path('test_create_usuario/', views.TestCreateUsuario.as_view(), name='test_create_usuario'),
    path('test_iniciar_sesion/', views.TestIniciarSesion.as_view(), name='test_iniciar_sesion'),
    path('test_cerrar_sesion/', views.TestCerrarSesion.as_view(), name='test_cerrar_sesion'),

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

    path('get_usuarios/', views.get_usuarios, name='get_usuarios'),  # ELIMINAR
]
