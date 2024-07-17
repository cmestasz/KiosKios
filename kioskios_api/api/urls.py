from django.urls import path
from .views import (
    IniciarSessionView, CerrarSessionView, CrearUsuarioView, CrearDueñoView,
    CrearTiendaView, CrearProductoView, CrearVentaView, GetTiendasView,
    GetProductosView, GetUsuarioByIdView, GetVentasView, GetCategoriasProductosView,
    CrearTiendaAdminView, CrearProductoAdminView, GetUsuariosAdminView,
    GetTiendasAdminView, GetProductosAdminView, GetVentasAdminView
)
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
    path('iniciar_sesion/', IniciarSessionView.as_view(), name='iniciar_sesion'),
    path('cerrar_sesion/', CerrarSessionView.as_view(), name='cerrar_sesion'),
    path('crear_usuario/', CrearUsuarioView.as_view(), name='crear_usuario'),
    path('crear_dueño/', CrearDueñoView.as_view(), name='crear_dueño'),
    path('crear_tienda/', CrearTiendaView.as_view(), name='crear_tienda'),
    path('crear_producto/', CrearProductoView.as_view(), name='crear_producto'),
    path('crear_venta/', CrearVentaView.as_view(), name='crear_venta'),
    path('get_tiendas/', GetTiendasView.as_view(), name='get_tiendas'),
    path('get_productos/', GetProductosView.as_view(), name='get_productos'),
    path('get_usuario_by_id/', GetUsuarioByIdView.as_view(), name='get_usuario_by_id'),
    path('get_ventas/', GetVentasView.as_view(), name='get_ventas'),
    path('get_categorias_productos/', GetCategoriasProductosView.as_view(),
         name='get_categorias_productos'),
    path('crear_tienda_admin/', CrearTiendaAdminView.as_view(),
         name='crear_tienda_admin'),
    path('crear_producto_admin/', CrearProductoAdminView.as_view(),
         name='crear_producto_admin'),
    path('get_usuarios_admin/', GetUsuariosAdminView.as_view(),
         name='get_usuarios_admin'),
    path('get_tiendas_admin/', GetTiendasAdminView.as_view(),
         name='get_tiendas_admin'),
    path('get_productos_admin/', GetProductosAdminView.as_view(),
         name='get_productos_admin'),
    path('get_ventas_admin/', GetVentasAdminView.as_view(), name='get_ventas_admin'),
]
