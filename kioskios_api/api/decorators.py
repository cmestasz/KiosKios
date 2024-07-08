from django.http import JsonResponse
from functools import wraps

def api_login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.COOKIES.get('sessionid') is not None:
            return func(request, *args, **kwargs)
        return JsonResponse({'status': 401, 'message': 'No permitido (inicia sesión para continuar)'})
    return wrapper