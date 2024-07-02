from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .forms import UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm
from .models import Usuario, Tienda, Producto

# Create your views here.


def forms_test(request):
    context = {
        'forms': [
            {'form': UsuarioForm(), 'url': reverse('create_usuario')},
            {'form': DueñoForm(), 'url': reverse('create_dueño')},
            {'form': TiendaForm(), 'url': reverse('create_tienda')},
            {'form': ProductoForm(), 'url': reverse('create_producto')},
            {'form': VentaForm(), 'url': reverse('create_venta')},
        ]
    }
    return render(request, 'forms_test.html', context)


def create_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'ok'})

        print(form.errors)
        return JsonResponse({'status': 'error', 'errors': form.errors})
    json = {
        'campos': [
            {'tipoCampo': 'input', 'name': 'username', 'label': 'Nombre de usuario'},
            {'tipoCampo': 'input', 'name': 'telefono', 'label': 'Teléfono'},
            {'tipoCampo': 'input', 'name': 'password1', 'label': 'Contraseña', 'attributes': ['type="password"', ]},
            {'tipoCampo': 'input', 'name': 'password2', 'label': 'Confirmar contraseña', 'attributes': ['type="password"', ]},
        ]
    }
    return JsonResponse(json)



def create_dueño(request):
    if request.method == 'POST':
        form = DueñoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'ok'})
        print(form.errors)
        return JsonResponse({'status': 'error', 'errors': form.errors})
    json = {
        'campos': [
            {'tipoCampo': 'input', 'name': 'username', 'label': 'Nombre de usuario'},
            {'tipoCampo': 'input', 'name': 'telefono', 'label': 'Teléfono'},
            {'tipoCampo': 'input', 'name': 'password1', 'label': 'Contraseña', 'attributes': ['type="password"', ]},
            {'tipoCampo': 'input', 'name': 'password2', 'label': 'Confirmar contraseña', 'attributes': ['type="password"', ]},
            {'tipoCampo': 'input', 'name': 'yape_qr', 'label': 'Código QR de Yape', 'attributes': ['type="file"', ]},
        ]
    }
    return JsonResponse(json)

@login_required
def create_tienda(request):
    if request.method == 'POST':
        form = TiendaForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'ok'})
        print(form.errors)
        return JsonResponse({'status': 'error', 'errors': form.errors})
    json = {
        'campos': [
            {'tipoCampo': 'input', 'name': 'nombre', 'label': 'Nombre de la tienda'},
            {'tipoCampo': 'textarea', 'name': 'descripcion', 'label': 'Descripción'},
            {'tipoCampo': 'input', 'name': 'ubication', 'label': 'Ubicación', 'attributes': ['type="hidden"', ]},
            {'tipoCampo': 'input', 'name': 'categoria', 'label': 'Categoría'},
            {'tipoCampo': 'input', 'name': 'dueño', 'label': 'Dueño', 'attributes': [f'value={request.user}', 'type="hidden"',]}
        ]
    }
    return JsonResponse(json)

@login_required
def create_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'ok'})
        print(form.errors)
        return JsonResponse({'status': 'error', 'errors': form.errors})
    json = {
        'campos': [
            {'tipoCampo': 'input', 'name': 'nombre', 'label': 'Nombre del producto'},
            {'tipoCampo': 'textarea', 'name': 'descripcion', 'label': 'Descripción'},
            {'tipoCampo': 'input', 'name': 'precio', 'label': 'Precio'},
            {'tipoCampo': 'input', 'name': 'stock', 'label': 'Stock'},
            {'tipoCampo': 'input', 'name': 'imagen', 'label': 'Imagen', 'attributes': ['type="file"', ]},
            {'tipoCampo': 'select', 'name': 'tienda', 'label': 'Tienda', 'options': [tienda for tienda in Tienda.objects.filter(dueño=request.user)]},
        ]
    }

@login_required
def create_venta(request):
    if request.method == 'POST':
        form = VentaForm(request.POST)
        if form.is_valid():
            form.save()
            return JsonResponse({'status': 'ok'})
        print(form.errors)
        return JsonResponse({'status': 'error', 'errors': form.errors})
    json = {
        'campos': [
            {'tipoCampo': 'input', 'name': 'usuario', 'label': 'Usuario', 'attributes': [f'value={request.user}', 'type="hidden"',]},
            {'tipoCampo': 'select', 'name': 'producto', 'label': 'Producto', 'options': [producto for producto in Producto.objects.filter(tienda=request.json()['tienda'])]},
            {'tipoCampo': 'input', 'name': 'cantidad', 'label': 'Cantidad'},
        ]
    }
