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
    path('iniciar_sesion/', views.IniciarSesion.as_view()),
    path('cerrar_sesion/', views.CerrarSesion.as_view()),
    path('crear_usuario/', views.CreateUsuario.as_view()),
    path('crear_dueño/', views.CreateDueño.as_view()),
    path('crear_tienda/', views.CreateTienda.as_view()),
    path('crear_producto/', views.CreateProducto.as_view()),
    path('crear_venta/', views.CreateVenta.as_view()),
    path('get_usuarios/', views.GetUsuarios.as_view()),
    path('get_tiendas/', views.GetTiendas.as_view()),
    path('get_productos/', views.GetProductos.as_view()),
    path('get_ventas/', views.GetVentas.as_view()),
    path('get_categorias_productos/', views.GetCategoriasProductos.as_view()),
]
