from django.forms import ModelForm
from django.contrib.auth.forms import BaseUserCreationForm
from .models import Administrador, Cliente, Dueño, Tienda, Producto, Venta

class AdministradorForm(BaseUserCreationForm):
    class Meta:
        model = Administrador
        fields = '__all__'

class ClienteForm(BaseUserCreationForm):
    class Meta:
        model = Cliente
        fields = '__all__'

class DueñoForm(BaseUserCreationForm):
    class Meta:
        model = Dueño
        fields = '__all__'

class TiendaForm(ModelForm):
    class Meta:
        model = Tienda
        fields = '__all__'

class ProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'

class VentaForm(ModelForm):
    class Meta:
        model = Venta
        fields = '__all__'