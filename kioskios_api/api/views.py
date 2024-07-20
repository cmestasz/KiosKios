from rest_framework.views import APIView
from rest_framework.response import Response
from .permissions import IsAdmin, IsOwner, IsUser, IsAuth
from . import renderers
from django.contrib.auth import authenticate
from django.core.exceptions import ObjectDoesNotExist
from .forms import (
    UsuarioForm, DueñoForm, TiendaForm, ProductoForm, LoginForm,
    TiendaFormAdmin, ProductoFormAdmin
)
from .models import Tienda, Producto, Venta, Usuario, VentaProducto, ActiveSessions
from .serializers import (
    UsuarioSerializer, TiendaSerializer, ProductoSerializer, VentaSerializer,
    form_serializer
)
from rest_framework.parsers import MultiPartParser
from django.core import serializers
from django.utils.crypto import get_random_string

MESSAGES = {
    'correct': {'status': 200, 'message': 'Correcto'},
    'created': {'status': 201, 'message': 'Creado'},
    'no_login': {'status': 401, 'message': 'No permitido (inicia sesión para continuar)'},
    'unallowed': {'status': 401, 'message': 'No permitido'},
    'fields_error': {'status': 406, 'message': 'Error en los campos'},
    'wrong_password': {'status': 406, 'message': 'Contraseña incorrecta'}
}


def get_user(request):
    return ActiveSessions.objects.get(session_key=request.data.get('token')).user


def is_user(request):
    return get_user(request).tipo == 'US'


def is_owner(request):
    return get_user(request).tipo == 'DU'


def is_admin(request):
    return get_user(request).tipo == 'AD'


class IniciarSesionView(APIView):
    def post(self, request):
        form = LoginForm(request.data)
        if form.is_valid():
            user = authenticate(
                request, username=form.cleaned_data['username'], password=form.cleaned_data['password']
            )
            if user:
                token = get_random_string(32)
                ActiveSessions.objects.create(user=user, session_key=token)

                response = Response({**MESSAGES['correct'], 'user': UsuarioSerializer(user).data, 'token': token})
                response.set_cookie('user', user)
                return response
            return Response(MESSAGES['wrong_password'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(LoginForm())})


class IniciarSesionGoogleView(APIView):
    def post(self, request):
        try:
            email = request.data.get('email')
            user = Usuario.objects.get(email=email)

            token = get_random_string(32)
            ActiveSessions.objects.create(user=user, session_key=token)
            return Response({**MESSAGES['correct'], 'user': UsuarioSerializer(user).data, 'token': token})
        except:
            return Response(MESSAGES['no_login'])


class CerrarSessionView(APIView):
    permission_classes = [IsAuth]

    def post(self, request):
        ActiveSessions.objects.get(session_key=request.data.get('token')).delete()
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
    permission_classes = [IsAuth, IsOwner]

    def post(self, request):
        form = TiendaForm(request.data)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.dueño = get_user(request)
            instance.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(TiendaForm())})


class CrearProductoView(APIView):
    permission_classes = [IsAuth, IsOwner]

    def post(self, request):
        form = ProductoForm(request.data, request.FILES)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(ProductoForm())})


class CrearVentaView(APIView):
    permission_classes = [IsAuth, IsUser]

    '''
    {
        "productos": [
            {
                "id": 1,
                "cantidad": 2
            },
            {
                "id": 2,
                "cantidad": 3
            }
        ]    
    }
    '''

    def post(self, request):
        venta = Venta.objects.create(usuario=get_user(request))
        for producto in request.data.get('productos'):
            VentaProducto.objects.create(
                venta=venta, producto=producto['id'], cantidad=producto['cantidad'])
        return Response({**MESSAGES['created'], 'id': venta.id})


class GetPDFVentaView(APIView):
    permission_classes = [IsAuth]

    def post(self, request):
        venta = Venta.objects.get(id=request.data.get('id'))
        venta_productos = VentaProducto.objects.filter(venta=venta)
        context = {
            'titulo': venta.id,
            'usuario': venta.usuario,
            'venta_productos': venta_productos,
            'fecha': venta.fecha,
            'total': sum([vp.producto.precio * vp.cantidad for vp in venta_productos])
        }
        return generate_pdf(request, context, 'venta_pdf.html', venta.id)


class GetTiendasView(APIView):
    permission_classes = [IsAuth]

    def post(self, request):
        if (get_user(request).tipo == 'DU'):
            tiendas = Tienda.objects.filter(dueño=get_user(request))
        else:
            tiendas = Tienda.objects.all()
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return Response({'status': 200, 'tiendas': serializer.data})


class GetProductosView(APIView):
    permission_classes = [IsAuth]

    def post(self, request):
        if is_user(request):
            productos = Producto.objects.filter(
                tienda__id=request.data.get('tienda'))
        elif is_owner(request):
            productos = Producto.objects.filter(tienda__dueño=get_user(request))
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
    permission_classes = [IsAuth]

    def post(self, request):
        if is_user(request):
            ventas = Venta.objects.filter(usuario=get_user(request))
        elif is_owner(request):
            ventas = Venta.objects.filter(producto__tienda__dueño=get_user(request))
        else:
            return Response(MESSAGES['unallowed'])
        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return Response({'status': 200, 'ventas': serializer.data})


class GetCategoriasProductosView(APIView):
    permission_classes = [IsAuth]

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
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        form = TiendaFormAdmin(request.data)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(TiendaFormAdmin())})


class CrearProductoAdminView(APIView):
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        form = ProductoFormAdmin(request.data, request.FILES)
        if form.is_valid():
            form.save()
            return Response(MESSAGES['created'])
        return Response(MESSAGES['fields_error'])

    def get(self, request):
        return Response({'status': 200, 'campos': form_serializer(ProductoFormAdmin())})


class GetUsuariosAdminView(APIView):
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(
            usuarios, many=True, context={'request': request})
        return Response({'status': 200, 'usuarios': serializer.data})


class GetTiendasAdminView(APIView):
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        tiendas = Tienda.objects.all()
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return Response({'status': 200, 'tiendas': serializer.data})


class GetProductosAdminView(APIView):
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return Response({'status': 200, 'productos': serializer.data})


class GetVentasAdminView(APIView):
    permission_classes = [IsAuth, IsAdmin]

    def post(self, request):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return Response({'status': 200, 'ventas': serializer.data})


def generate_pdf(request, context, template, filename):
    response = renderers.render_to_pdf(template, context)

    content = f"inline; filename={filename}.pdf"
    download = request.GET.get("download")
    if download:
        content = f"attachment; filename={filename}.pdf"
    response['Content-Disposition'] = content
    return response
