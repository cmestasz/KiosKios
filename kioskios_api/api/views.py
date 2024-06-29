from django.shortcuts import render
from django.urls import reverse
from .forms import UsuarioForm, DueñoForm, TiendaForm, ProductoForm, VentaForm

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
        else:
            print(form.errors)
        return forms_test(request)

def create_dueño(request):
    if request.method == 'POST':
        form = DueñoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
        else:
            print(form.errors)
        return forms_test(request)


def create_tienda(request):
    if request.method == 'POST':
        form = TiendaForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            print(form.errors)
        return forms_test(request)


def create_producto(request):
    if request.method == 'POST':
        form = ProductoForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            print(form.errors)
        return forms_test(request)


def create_venta(request):
    if request.method == 'POST':
        form = VentaForm(request.POST)
        if form.is_valid():
            form.save()
        else:
            print(form.errors)
        return forms_test(request)

