from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .forms import UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm, LoginForm, LogoutForm
from .models import Tienda, Producto, Venta, Usuario
from .decorators import api_login_required
from .serializers import form_serializer, model_serializer
from django.contrib.auth import authenticate, login, logout

# Create your views here.


def forms_test(request):
    context = {
        'forms': [
            {'form': LoginForm(), 'url': reverse('iniciar_sesion')},
            {'form': LogoutForm(), 'url': reverse('cerrar_sesion')},
            {'form': UsuarioForm(), 'url': reverse('create_usuario')},
            {'form': DueñoForm(), 'url': reverse('create_dueño')},
            {'form': TiendaForm(), 'url': reverse('create_tienda')},
            {'form': ProductoForm(), 'url': reverse('create_producto')},
            {'form': VentaForm(), 'url': reverse('create_venta')},
        ]
    }
    return render(request, 'forms_test.html', context)


def iniciar_sesion(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            user = authenticate(
                request, username=form.cleaned_data['username'], password=form.cleaned_data['password'])
            if user:
                login(request, user)
                return JsonResponse({'status': 200, 'message': 'Sesión iniciada',})
            return JsonResponse({'status': 406, 'message': 'Contraseña incorrecta',})
    json = {
        'status': 200,
        'campos': form_serializer(LoginForm())
    }
    return JsonResponse(json)


@api_login_required
def cerrar_sesion(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'status': 200, 'message': 'Sesión cerrada',})
    return JsonResponse({'status': 403, 'errors': 'No permitido',})


def create_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 201, 'message': 'Usuario creado',})

        print(form.errors)
        return JsonResponse({'status': 406, 'message': 'Error en los campos'})
    json = {
        'status': 200,
        'campos': form_serializer(UsuarioForm())
    }
    return JsonResponse(json)


def create_dueño(request):
    if request.method == 'POST':
        form = DueñoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 201, 'message': 'Dueño creado',})
        
        print(form.errors)
        return JsonResponse({'status': 406, 'message': 'Error en los campos'})
    json = {
        'status': 200,
        'campos': form_serializer(DueñoForm())
    }
    return JsonResponse(json)


@api_login_required
def create_tienda(request):
    if request.method == 'POST':
        form = TiendaForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 201, 'message': 'Tienda creada',})
        
        print(form.errors)
        return JsonResponse({'status': 406, 'message': 'Error en los campos'})
    json = {
        'status': 200,
        'campos': form_serializer(TiendaForm())
    }
    return JsonResponse(json)


@api_login_required
def get_tiendas(request):
    if (request.user.tipo == 'DU'):
        tiendas = Tienda.objects.filter(dueño=request.user)
    else:
        tiendas = Tienda.objects.all()
    json = {
        'status': 200,
        'tipo': 'DU' if request.user.tipo == 'DU' else 'AD',
        'tiendas': [model_serializer(tienda) for tienda in tiendas]
    }
    return JsonResponse(json)


@api_login_required
def create_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 200})
        
        print(form.errors)
        return JsonResponse({'status': 406, 'message': 'Error en los campos'})
    json = {
        'status': 200,
        'campos': form_serializer(ProductoForm())
    }
    return JsonResponse(json)


@api_login_required
def get_productos(request):
    productos = Producto.objects.filter(tienda=request.json()['tienda'])
    json = {
        'status': 200,
        'productos': [model_serializer(producto) for producto in productos]
    }
    return JsonResponse(json)


@api_login_required
def create_venta(request):
    if request.method == 'POST':
        form = VentaForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 200})
        
        return JsonResponse({'status': 406, 'message': 'Error en los campos'})
    json = {
        'status': 200,
        'campos': form_serializer(VentaForm())
    }
    return JsonResponse(json)


@api_login_required
def get_ventas(request):
    if request.user.tipo == 'US':
        ventas = Venta.objects.filter(usuario=request.user)
    else:
        ventas = Venta.objects.filter(producto__tienda__dueño=request.user)
    json = {
        'status': 200,
        'ventas': [model_serializer(venta) for venta in ventas]
    }
    return JsonResponse(json)

# ES DE PRUEBA, ELIMINAR EN PRODUCCION
def get_usuarios(request):
    usuarios = Usuario.objects.all()
    json = {
        'status': 200,
        'usuarios': [model_serializer(usuario) for usuario in usuarios]
    }
    return JsonResponse(json)

def get_errors(form_errors):
    return [error for sublist in form_errors.values() for error in sublist]