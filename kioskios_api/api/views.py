from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from .forms import UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm, LoginForm, LogoutForm, TiendaFormAdmin, ProductoFormAdmin, VentaFormAdmin
from .models import Tienda, Producto, Venta, Usuario
from .serializers import UsuarioSerializer, TiendaSerializer, ProductoSerializer, VentaSerializer, form_serializer
from django.contrib.auth import authenticate, login, logout
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
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


def process_create_form(request, form):
    if form.is_valid():
        form.save()
        return JsonResponse(MESSAGES['created'])
    return JsonResponse(MESSAGES['fields_error'])


def send_create_form(request, form):
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

@csrf_exempt
def iniciar_session(request):
    if (request.method == 'POST'):
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user:
                login(request, user)
                get_token(request)
                return JsonResponse(MESSAGES['correct'].update({'user': UsuarioSerializer(user).data}))
            return JsonResponse(MESSAGES['wrong_password'])
        return JsonResponse(MESSAGES['fields_error'])
    response = JsonResponse({
        'status': 200,
        'campos': form_serializer(LoginForm())
    })
    return response


def cerrar_session(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse(MESSAGES['correct'])
    return JsonResponse(MESSAGES['no_login'])

@csrf_exempt
def crear_usuario(request):
    if (request.method == 'POST'):
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, UsuarioForm())

@csrf_exempt
def crear_dueño(request):
    if (request.method == 'POST'):
        form = DueñoForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, DueñoForm())


def crear_tienda(request):
    if (not is_owner(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        form = TiendaForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.dueño = request.user
            instance.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, TiendaForm())


def crear_producto(request):
    if (not is_owner(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, ProductoForm())


def crear_venta(request):
    if (not is_user(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        form = VentaForm(request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.usuario = request.user
            instance.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, VentaForm())


def get_tiendas(request):
    if (not is_owner(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        tiendas = Tienda.objects.filter(dueño=request.user)
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'tiendas': serializer.data}, safe=False)
    return JsonResponse(MESSAGES['unallowed'])


def get_productos(request):
    if (request.method == 'POST'):
        if (is_user(request)):
            productos = Producto.objects.filter(
                tienda=request.json()['tienda'])
        elif (is_owner(request)):
            productos = Producto.objects.filter(tienda__dueño=request.user)

        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'productos': serializer.data}, safe=False)


def get_ventas(request):
    if (request.method == 'POST'):
        if (is_user(request)):
            ventas = Venta.objects.filter(usuario=request.user)
        elif (is_owner(request)):
            ventas = Venta.objects.filter(producto__tienda__dueño=request.user)

        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'ventas': serializer.data}, safe=False)


def get_categorias_productos(request):
    if (request.method == 'POST'):
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
    return JsonResponse(MESSAGES['unallowed'])


def crear_tienda_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        form = TiendaFormAdmin(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, TiendaFormAdmin())


def crear_producto_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        form = ProductoFormAdmin(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse(MESSAGES['created'])
        return JsonResponse(MESSAGES['fields_error'])
    return send_create_form(request, ProductoFormAdmin())


def get_usuarios_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        usuarios = Usuario.objects.all()
        serializer = UsuarioSerializer(
            usuarios, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'usuarios': serializer.data}, safe=False)
    return JsonResponse(MESSAGES['unallowed'])


def get_tiendas_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        tiendas = Tienda.objects.all()
        serializer = TiendaSerializer(
            tiendas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'tiendas': serializer.data}, safe=False)
    return JsonResponse(MESSAGES['unallowed'])


def get_productos_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        productos = Producto.objects.all()
        serializer = ProductoSerializer(
            productos, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'productos': serializer.data}, safe=False)
    return JsonResponse(MESSAGES['unallowed'])


def get_ventas_admin(request):
    if (not is_admin(request)):
        return JsonResponse(MESSAGES['unallowed'])
    if (request.method == 'POST'):
        ventas = Venta.objects.all()
        serializer = VentaSerializer(
            ventas, many=True, context={'request': request})
        return JsonResponse({'status': 200, 'ventas': serializer.data}, safe=False)
    return JsonResponse(MESSAGES['unallowed'])