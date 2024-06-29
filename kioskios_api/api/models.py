from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, UserManager

# Create your models here.


class UsuarioManager(BaseUserManager):
    def create_user(self, username, telefono, password):
        if not username:
            raise ValueError('Ingrese un correo electrónico')
        if not telefono:
            raise ValueError('Ingrese un número de teléfono')
        if not password:
            raise ValueError('Ingrese una contraseña')
        usuario = self.model(
            username=self.normalize_email(username),
            telefono=telefono
        )
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, username, telefono, password=None):
        usuario = self.create_user(username, telefono, password)
        usuario.is_admin = True
        usuario.is_staff = True
        usuario.is_superuser = True
        usuario.save(using=self._db)
        return usuario


class Usuario(AbstractUser):
    class Types(models.TextChoices):
        USUARIO = 'US', 'Usuario'
        DUEÑO = 'DU', 'Dueño'
        ADMIN = 'AD', 'Administrador'


    username = models.EmailField(unique=True)
    telefono = models.CharField(max_length=9)
    yape_qr = models.ImageField(upload_to='yape_qrs', blank=True, null=True)
    tipo = models.CharField(max_length=2, choices=Types.choices, default=Types.USUARIO)

    objects = UsuarioManager()

    USERNAME_FIELD = 'username'


class Tienda(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    dueño = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': Usuario.Types.DUEÑO})
    # ubicacion


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    imagen = models.ImageField(upload_to='productos', blank=True, null=True)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()


class Venta(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={'tipo': Usuario.Types.USUARIO})
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.PositiveIntegerField()
