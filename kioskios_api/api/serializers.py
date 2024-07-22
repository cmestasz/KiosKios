from django import forms
from django.forms import ModelForm
from django.core import validators
from rest_framework import serializers
from .models import Usuario, Tienda, Producto, Venta


class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'password', 'telefono', 'tipo', 'yape_qr']


class TiendaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tienda
        fields = ['id', 'nombre', 'descripcion',
                  'categoria', 'dueño', 'latitud', 'longitud']


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion',
                  'precio', 'imagen', 'tienda', 'stock', 'categoria']


class VentaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Venta
        fields = ['id', 'usuario', 'producto', 'fecha', 'cantidad']


def form_serializer(form: ModelForm):
    fields = []
    for name, field in form.fields.items():
        field_data = {
            'tipoCampo': get_tipo_campo(field),
            'name': name,
            'label': field.label or name.capitalize(),
            'validators': get_validators(field),
            'attributes': get_attributes(field),
        }
        if field_data['tipoCampo'] == 'select':
            field_data['options'] = get_options(field)
        fields.append(field_data)
    return fields


def get_tipo_campo(field):
    if isinstance(field, forms.FileField) or isinstance(field, forms.ImageField):
        return 'input'
    if isinstance(field, forms.ChoiceField):
        return 'select'
    if isinstance(field, forms.Textarea):
        return 'textarea'
    return 'input'


def get_validators(field):
    validators_dict = {}
    for validator in field.validators:
        if isinstance(validator, validators.MaxLengthValidator):
            validators_dict['maxlength'] = str(validator.limit_value)
        elif isinstance(validator, validators.MinLengthValidator):
            validators_dict['minlength'] = str(validator.limit_value)
        elif isinstance(validator, validators.EmailValidator):
            validators_dict['email'] = 'true'

    if field.required:
        validators_dict['required'] = 'true'

    if isinstance(field, forms.DecimalField):
        validators_dict['min'] = str(
            field.min_value) if field.min_value is not None else ''
        validators_dict['max'] = str(
            field.max_value) if field.max_value is not None else ''
        validators_dict['decimal'] = 'true'

    if isinstance(field, forms.IntegerField):
        validators_dict['min'] = str(
            field.min_value) if field.min_value is not None else ''
        validators_dict['max'] = str(
            field.max_value) if field.max_value is not None else ''

    return validators_dict


def get_attributes(field):
    attributes = {}
    if hasattr(field.widget, 'input_type'):
        attributes['type'] = field.widget.input_type

    if isinstance(field, forms.FileField) or isinstance(field, forms.ImageField):
        attributes['type'] = 'file'
        if isinstance(field, forms.ImageField):
            attributes['accept'] = 'image/*'

    if isinstance(field, forms.DateTimeField):
        attributes['type'] = 'datetime-local'

    if isinstance(field, forms.DecimalField):
        attributes['step'] = str(10 ** -field.decimal_places)

    return attributes


def get_options(field):
    if isinstance(field, forms.ModelChoiceField):
        return [{'label': str(obj), 'value': obj.pk} for obj in field.queryset]
    elif hasattr(field, 'choices'):
        return [{'label': label, 'value': serialize_value(value)} for value, label in field.choices]
    return []


def serialize_value(value):
    if hasattr(value, 'pk'):
        return value.pk
    elif isinstance(value, (list, tuple)) and len(value) == 2:
        return value[0]
    return value
