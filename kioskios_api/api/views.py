from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from .forms import UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm, LoginForm, LogoutForm
from .models import Tienda, Producto, Venta, Usuario
from .serializers import UsuarioSerializer, TiendaSerializer, ProductoSerializer, VentaSerializer, form_serializer
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.views import APIView
import requests
# Create your views here.

MESSAGES = {
    'correct': {'status': 200, 'message': 'Correcto'},
    'created': {'status': 201, 'message': 'Creado'},
    'no_login': {'status': 401, 'message': 'No permitido (inicia sesión para continuar)'},
    'unallowed': {'status': 401, 'message': 'No permitido'},
    'fields_error': {'status': 406, 'message': 'Error en los campos'},
    'wrong_password': {'status': 406, 'message': 'Contraseña incorrecta'}
}


def verify_login(request):
    if request.user.is_authenticated:
        return True
    return False


def process_create_form(self, request, form):
    if form.is_valid():
        form.save()
        return JsonResponse(MESSAGES['created'])
    return JsonResponse(MESSAGES['fields_error'])


def send_create_form(self, request, form):
    response = JsonResponse({
        'status': 200,
        'campos': form_serializer(form)
    })
    return response


def is_user(request):
    return request.user.tipo == 'US'


def is_owner(request):
    return request.user.tipo == 'DU'


def is_admin(request):
    return request.user.tipo == 'AD'


# TODO :admin forms


class IniciarSesion(APIView):
    def post(self, request, format=None):
        form = LoginForm(request.data)
        if form.is_valid():
            user = authenticate(
                request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user:
                login(request, user)
                get_token(request)
                return JsonResponse(MESSAGES['correct'])
            return JsonResponse(MESSAGES['wrong_password'])
        return JsonResponse(MESSAGES['fields_error'])

    def get(self, request, format=None):
        response = JsonResponse({
            'status': 200,
            'campos': form_serializer(LoginForm())
        })
        return response


class CerrarSesion(APIView):
    def post(self, request, format=None):
        if verify_login(self, request):
            logout(request)
            return JsonResponse(MESSAGES['correct'])
        return JsonResponse(MESSAGES['no_login'])

    def get(self, request, format=None):
        if verify_login(self, request):
            response = JsonResponse({
                'status': 200,
                'campos': form_serializer(LogoutForm())
            })
            return response
        return JsonResponse(MESSAGES['no_login'])


class CreateUsuario(APIView):
    def post(self, request, format=None):
        form = UsuarioForm(request.data)
        return process_create_form(self, request, form)

    def get(self, request, format=None):
        return send_create_form(self, request, UsuarioForm())


class CreateDueño(APIView):
    def post(self, request, format=None):
        form = DueñoForm(request.data)
        return process_create_form(self, request, form)

    def get(self, request, format=None):
        return send_create_form(self, request, DueñoForm())


class CreateTienda(APIView):
    def post(self, request, format=None):
        if (not is_owner(request)):
            return JsonResponse(MESSAGES['unallowed'])
        form = TiendaForm(request.data)

        if form.is_valid():
            instance = form.save(commit=False)
            instance.dueño = request.user
            instance.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])

    def get(self, request, format=None):
        if (not is_owner(request)):
            return JsonResponse(MESSAGES['unallowed'])
        return send_create_form(self, request, TiendaForm())


class CreateProducto(APIView):
    def post(self, request, format=None):
        if (not is_owner(request)):
            return JsonResponse(MESSAGES['unallowed'])
        form = ProductoForm(request.data)
        return process_create_form(self, request, form)

    def get(self, request, format=None):
        if (not is_owner(request)):
            return JsonResponse(MESSAGES['unallowed'])
        form = ProductoForm()
        form.fields['tienda'].queryset = Tienda.objects.filter(
            dueño=request.user)
        return send_create_form(self, request, form)


class CreateVenta(APIView):
    def post(self, request, format=None):
        if (not is_user(request)):
            return JsonResponse(MESSAGES['unallowed'])
        form = VentaForm(request.data)

        if form.is_valid():
            instance = form.save(commit=False)
            instance.usuario = request.user
            instance.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])

    def get(self, request, format=None):
        if (not is_user(request)):
            return JsonResponse(MESSAGES['unallowed'])
        form = VentaForm()
        form.fields['producto'].queryset = Producto.objects.filter(
            tienda=request.json()['tienda'])
        return send_create_form(self, request, VentaForm())


class GetUsuarios(APIView):
    def post(self, request, format=None):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(
            usuarios, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'usuarios': serializer.data}, safe=False)


class GetTiendas(APIView):
    def post(self, request, format=None):
        if (not is_owner(request)):
            return JsonResponse(MESSAGES['unallowed'])
        tiendas = Tienda.objects.filter(dueño=request.user)
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'tiendas': serializer.data}, safe=False)


class GetProductos(APIView):
    def post(self, request, format=None):
        if (is_user(request)):
            productos = Producto.objects.filter(
                tienda=request.json()['tienda'])
        elif (is_owner(request)):
            productos = Producto.objects.filter(tienda__dueño=request.user)
        else:
            productos = Producto.objects.all()

        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'productos': serializer.data}, safe=False)


class GetVentas(APIView):
    def post(self, request, format=None):
        if (is_user(request)):
            ventas = Venta.objects.filter(usuario=request.user)
        elif (is_owner(request)):
            ventas = Venta.objects.filter(producto__tienda__dueño=request.user)
        else:
            ventas = Venta.objects.all()

        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'ventas': serializer.data}, safe=False)


class GetCategoriasProductos(APIView):
    def post(self, request, format=None):
        json_productos = {
            'COM': [],
            'LIB': [],
            'SNA': [],
            'BEB': [],
            'IMP': [],
            'ELE': [],
            'ASE': [],
            'OTR': []
        }
        for category in Producto.Categories.choices:
            productos = Producto.objects.filter(categoria=category[0])
            serializer = ProductoSerializer(
                productos, many=True, context={'request': request})
            json_productos[category[0]] = serializer.data
        return JsonResponse({'status': 200, 'productos': json_productos}, safe=False)
