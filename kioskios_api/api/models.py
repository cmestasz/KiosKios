from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager

# Create your models here.


class UsuarioManager(BaseUserManager):
    def create_user(self, correo, telefono, password):
        if not correo:
            raise ValueError('Ingrese un correo electrónico')
        if not telefono:
            raise ValueError('Ingrese un número de teléfono')
        if not password:
            raise ValueError('Ingrese una contraseña')
        usuario = self.model(
            correo=self.normalize_email(correo),
            telefono=telefono
        )
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, correo, telefono, password=None):
        usuario = self.create_user(correo, telefono, password)
        usuario.is_admin = True
        usuario.is_staff = True
        usuario.is_superuser = True
        usuario.save(using=self._db)
        return usuario


class Usuario(AbstractUser):
    correo = models.EmailField(unique=True)
    telefono = models.CharField(max_length=9)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'


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
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.PositiveIntegerField()
