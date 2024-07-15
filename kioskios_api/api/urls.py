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
    path('iniciar_sesion/', views.iniciar_session),
    path('cerrar_sesion/', views.cerrar_session),
    path('crear_usuario/', views.crear_usuario),
    path('crear_dueño/', views.crear_dueño),
    path('crear_tienda/', views.crear_tienda),
    path('crear_producto/', views.crear_producto),
    path('crear_venta/', views.crear_venta),
    path('get_tiendas/', views.get_tiendas),
    path('get_productos/', views.get_productos),
    path('get_ventas/', views.get_ventas),
    path('get_categorias_productos/', views.get_categorias_productos),
    path('crear_tienda_admin/', views.crear_tienda_admin),
    path('crear_producto_admin/', views.crear_producto_admin),
    path('get_usuarios_admin/', views.get_usuarios_admin),
    path('get_tiendas_admin/', views.get_tiendas_admin),
]
