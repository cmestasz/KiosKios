from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Usuario(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=9)

class Administrador(Usuario):
    pass

class Cliente(Usuario):
    pass

class Dueño(Usuario):
    yape_qr = models.ImageField(upload_to='yape_qrs', blank=True, null=True)

class Tienda(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    dueño = models.ForeignKey(Dueño, on_delete=models.CASCADE)
    # ubicacion

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    imagen = models.ImageField(upload_to='productos', blank=True, null=True)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()

class Venta(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.PositiveIntegerField()

    