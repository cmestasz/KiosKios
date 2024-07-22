from django.urls import path
from .views import (
    IniciarSesionView, CerrarSessionView, CrearUsuarioView, CrearDueñoView,
    CrearTiendaView, CrearProductoView, CrearVentaView, GetTiendasView,
    GetProductosView, GetUsuarioPorCorreoView, GetVentasView, GetCategoriasProductosView,
    CrearTiendaAdminView, CrearProductoAdminView, GetUsuariosAdminView,
    GetTiendasAdminView, GetProductosAdminView, GetVentasAdminView, GetPDFVentaView, IniciarSesionGoogleView,
    GetProductoPorIdView, GetTiendaPorIdView, GetQRPorTiendaView, EliminarProductoView
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
    path('login/', IniciarSesionView.as_view(), name='login'),
    path('google_login/', IniciarSesionGoogleView.as_view(), name='google_login'),
    path('logout/', CerrarSessionView.as_view(), name='logout'),
    path('create_user/', CrearUsuarioView.as_view(), name='create_user'),
    path('create_owner/', CrearDueñoView.as_view(), name='create_owner'),
    path('create_shop/', CrearTiendaView.as_view(), name='create_shop'),
    path('create_product/', CrearProductoView.as_view(), name='create_product'),
    path('create_sale/', CrearVentaView.as_view(), name='create_sale'),
    path('get_shops/', GetTiendasView.as_view(), name='get_shops'),
    path('get_shop_by_id/', GetTiendaPorIdView.as_view(), name='get_shop_by_id'),
    path('get_products/', GetProductosView.as_view(), name='get_products'),
    path('delete_product/', EliminarProductoView.as_view(), name='delete_product'),
    path('get_product_by_id/', GetProductoPorIdView.as_view(),
         name='get_product_by_id'),
    path('get_user_by_email/', GetUsuarioPorCorreoView.as_view(),
         name='get_user_by_email'),
    path('get_sales/', GetVentasView.as_view(), name='get_sales'),
    path('get_product_categories/', GetCategoriasProductosView.as_view(),
         name='get_product_categories'),
    path('get_pdf_sale', GetPDFVentaView.as_view(), name='get_pdf_sale'),
    path('get_qr_by_shop/', GetQRPorTiendaView.as_view(), name='get_qr_by_shop'),
    path('create_shop_admin/', CrearTiendaAdminView.as_view(),
         name='create_shop_admin'),
    path('create_product_admin/', CrearProductoAdminView.as_view(),
         name='create_product_admin'),
    path('get_users_admin/', GetUsuariosAdminView.as_view(),
         name='get_users_admin'),
    path('get_shops_admin/', GetTiendasAdminView.as_view(),
         name='get_shops_admin'),
    path('get_products_admin/', GetProductosAdminView.as_view(),
         name='get_products_admin'),
    path('get_sales_admin/', GetVentasAdminView.as_view(), name='get_sales_admin'),
]
