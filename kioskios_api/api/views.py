from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ObjectDoesNotExist
from .forms import (
    UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm, LoginForm,
    TiendaFormAdmin, ProductoFormAdmin
)
from .models import Tienda, Producto, Venta, Usuario
from .serializers import (
    UsuarioSerializer, TiendaSerializer, ProductoSerializer, VentaSerializer,
    form_serializer
)
from rest_framework.parsers import MultiPartParser

MESSAGES = {
    'correct': {'status': 200, 'message': 'Correcto'},
    'created': {'status': 201, 'message': 'Creado'},
    'no_login': {'status': 401, 'message': 'No permitido (inicia sesión para continuar)'},
    'unallowed': {'status': 401, 'message': 'No permitido'},
    'fields_error': {'status': 406, 'message': 'Error en los campos'},
    'wrong_password': {'status': 406, 'message': 'Contraseña incorrecta'}
}


def is_user(user):
    return user.tipo == 'US'


def is_owner(user):
    return user.tipo == 'DU'


def is_admin(user):
    return user.tipo == 'AD'


class IniciarSessionView(APIView):
    def post(self, request):
        form = LoginForm(request.data)
        if form.is_valid():
            user = authenticate(
                request, username=form.cleaned_data['username'], password=form.cleaned_data['password']
            )
            if user:
                login(request, user)
                return Response({**MESSAGES['correct'], 'user': UsuarioSerializer(user).data})
            return Response(MESSAGES['wrong_password'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(LoginForm())})


class CerrarSessionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response(MESSAGES['correct'])


class CrearUsuarioView(APIView):
    def post(self, request):
        form = UsuarioForm(request.data)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(UsuarioForm())})


class CrearDueñoView(APIView):
    parser_classes = [MultiPartParser]

    def post(self, request):
        request.FILES['yape_qr']._name = request.data.get('email') + '.png'
        print(request.FILES['yape_qr'].__dict__)
        form = DueñoForm(request.data, request.FILES)
        print(form.errors)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(DueñoForm())})


class CrearTiendaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not is_owner(request.user):
            return Response(MESSAGES['unallowed'])
        form = TiendaForm(request.data)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.dueño = request.user
            instance.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(TiendaForm())})


class CrearProductoView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not is_owner(request.user):
            return Response(MESSAGES['unallowed'])
        form = ProductoForm(request.data, request.FILES)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(ProductoForm())})


class CrearVentaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not is_user(request.user):
            return Response(MESSAGES['unallowed'])
        form = VentaForm(request.data)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.usuario = request.user
            instance.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(VentaForm())})


class GetTiendasView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not is_owner(request.user):
            return Response(MESSAGES['unallowed'])
        tiendas = Tienda.objects.filter(dueño=request.user)
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return Response({'status': 200, 'tiendas': serializer.data})


class GetProductosView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if is_user(request.user):
            productos = Producto.objects.filter(
                tienda=request.data.get('tienda'))
        elif is_owner(request.user):
            productos = Producto.objects.filter(tienda__dueño=request.user)
        else:
            return Response(MESSAGES['unallowed'])
        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return Response({'status': 200, 'productos': serializer.data})


class GetUsuarioPorCorreoView(APIView):
    # TODO: para quien es esto?
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'status': 404, 'usuario': 'Usuario no encontrado'})
        email = email.strip()
        try:
            usuario = Usuario.objects.get(email=email)
        except ObjectDoesNotExist:
            return Response({'status': 404, 'usuario': 'Usuario no encontrado'})
        serializer = UsuarioSerializer(usuario)
        return Response({'status': 200, 'usuario': serializer.data})


class GetVentasView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if is_user(request.user):
            ventas = Venta.objects.filter(usuario=request.user)
        elif is_owner(request.user):
            ventas = Venta.objects.filter(producto__tienda__dueño=request.user)
        else:
            return Response(MESSAGES['unallowed'])
        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return Response({'status': 200, 'ventas': serializer.data})


class GetCategoriasProductosView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        json_productos = {category[0]: []
                          for category in Producto.Categories.choices}
        for category in Producto.Categories.choices:
            productos = Producto.objects.filter(categoria=category[0])
            serializer = ProductoSerializer(
                productos, many=True, context={'request': request})
            json_productos[category[0]] = serializer.data
        return Response({'status': 200, 'productos': json_productos})


class CrearTiendaAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        form = TiendaFormAdmin(request.data)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(TiendaFormAdmin())})


class CrearProductoAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        form = ProductoFormAdmin(request.data, request.FILES)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(ProductoFormAdmin())})


class GetUsuariosAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(
            usuarios, many=True, context={'request': request})
        return Response({'status': 200, 'usuarios': serializer.data})


class GetTiendasAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        tiendas = Tienda.objects.all()
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return Response({'status': 200, 'tiendas': serializer.data})


class GetProductosAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return Response({'status': 200, 'productos': serializer.data})


class GetVentasAdminView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return Response({'status': 200, 'ventas': serializer.data})
