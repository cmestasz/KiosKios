from django.contrib.auth.models import Group
from django.contrib import admin
from .models import Usuario, Tienda, Producto, Venta

# Register your models here.
admin.site.register(Usuario)
admin.site.register(Tienda)
admin.site.register(Producto)
admin.site.register(Venta)

admin.site.unregister(Group)