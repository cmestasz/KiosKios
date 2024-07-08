from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.


class UsuarioManager(BaseUserManager):
    def create_user(self, email, telefono, password):
        if not email:
            raise ValueError('Ingrese un correo electrónico')
        if not telefono:
            raise ValueError('Ingrese un número de teléfono')
        if not password:
            raise ValueError('Ingrese una contraseña')
        n_email = self.normalize_email(email)
        usuario = self.model(
            username=n_email,
            telefono=telefono,
            email=n_email
        )
        usuario.set_password(password)
        usuario.save(using=self._db)
        return usuario

    def create_superuser(self, email, password=None):
        usuario = self.create_user(email, '000000000', password)
        usuario.is_admin = True
        usuario.is_staff = True
        usuario.is_superuser = True
        usuario.email = email
        usuario.tipo = Usuario.Types.ADMIN
        usuario.save(using=self._db)
        return usuario


class Usuario(AbstractUser):
    class Types(models.TextChoices):
        USUARIO = 'US', 'Usuario'
        DUEÑO = 'DU', 'Dueño'
        ADMIN = 'AD', 'Administrador'

    email = models.EmailField(unique=True)
    telefono = models.CharField(max_length=9)
    yape_qr = models.ImageField(upload_to='yape_qrs/', blank=True, null=True)
    tipo = models.CharField(
        max_length=2, choices=Types.choices, default=Types.USUARIO)

    objects = UsuarioManager()

    REQUIRED_FIELDS = []
    USERNAME_FIELD = 'email'


class Tienda(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    categoria = models.CharField(max_length=100)
    dueño = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={
                              'tipo': Usuario.Types.DUEÑO})
    latitud = models.DecimalField(max_digits=9, decimal_places=6)
    longitud = models.DecimalField(max_digits=9, decimal_places=6)


class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=6, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/', blank=True, null=True)
    tienda = models.ForeignKey(Tienda, on_delete=models.CASCADE)
    stock = models.PositiveIntegerField()


class Venta(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, limit_choices_to={
                                'tipo': Usuario.Types.USUARIO})
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    cantidad = models.PositiveIntegerField()
