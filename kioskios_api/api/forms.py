from django import forms
from django.forms import ModelForm
from .models import Usuario, Tienda, Producto, Venta

class LoginForm(forms.Form):
    username = forms.CharField(label='Nombre de usuario')
    password = forms.CharField(label='Contraseña', widget=forms.PasswordInput)

class LogoutForm(forms.Form):
    pass

class UsuarioForm(ModelForm):
    password1 = forms.CharField(label='Contraseña', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirmar contraseña', widget=forms.PasswordInput)

    class Meta:
        model = Usuario
        fields = ['email', 'telefono', 'password1', 'password2']

    def clean_telefono(self):
        telefono = self.cleaned_data.get('telefono')
        if not telefono:
            raise forms.ValidationError('Ingrese un número de teléfono')
        if len(telefono) != 9:
            raise forms.ValidationError('Ingrese un número de teléfono válido')
        return telefono

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError('Las contraseñas no coinciden')
        return password2
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
        return user

class DueñoForm(UsuarioForm):
    class Meta:
        model = Usuario
        fields = ['email', 'telefono', 'password1', 'password2', 'yape_qr']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.tipo = Usuario.Types.DUEÑO
        if commit:
            user.save()
        return user
    
    def clean_yape_qr(self):
        yape_qr = self.cleaned_data.get('yape_qr')
        if not yape_qr:
            instance = self.instance
            if instance.pk:
                yape_qr = instance.yape_qr
        return yape_qr

class AdminForm(UsuarioForm):
    class Meta:
        model = Usuario
        fields = ['username', 'telefono', 'password1', 'password2']

    def save(self, commit=True):
        user = super().save(commit=False)
        user.tipo = Usuario.Types.ADMIN
        if commit:
            user.save()
        return user

class TiendaForm(ModelForm):
    class Meta:
        model = Tienda
        fields = ['nombre', 'descripcion', 'categoria', 'latitud', 'longitud']

class ProductoForm(ModelForm):
    class Meta:
        model = Producto
        fields = '__all__'


class VentaForm(ModelForm):
    class Meta:
        model = Venta
        fields = ['producto', 'cantidad']
