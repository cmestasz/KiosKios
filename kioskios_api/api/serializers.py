from django import forms
from django.forms import ModelForm
from django.core import validators
from django.core.serializers.json import DjangoJSONEncoder
from django.db.models import Model
from django.db.models.fields.files import ImageFieldFile
from decimal import Decimal
from rest_framework import serializers, viewsets
from .models import Usuario, Tienda, Producto, Venta


class UsuarioSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Usuario
        fields = ['url', 'username', 'password', 'telefono', 'tipo', 'yape_qr']


class TiendaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Tienda
        fields = ['url', 'nombre', 'descripcion',
                  'categoria', 'dueño', 'latitud', 'longitud']


class ProductoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Producto
        fields = ['url', 'nombre', 'descripcion',
                  'precio', 'imagen', 'tienda', 'stock']


class VentaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Venta
        fields = ['url', 'usuario', 'producto', 'fecha', 'cantidad']


class CustomJSONEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, ImageFieldFile):
            return obj.url if obj else None
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)


def model_serializer(instance: Model, fields=None, exclude=None):
    data = {}
    for field in instance._meta.fields:
        if (fields is None or field.name in fields) and (exclude is None or field.name not in exclude):
            value = getattr(instance, field.name)
            if isinstance(value, Model):
                value = model_serializer(value)
            elif isinstance(value, ImageFieldFile):
                value = value.url if value else None
            elif isinstance(value, Decimal):
                value = float(value)
            data[field.name] = value
    return data


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
