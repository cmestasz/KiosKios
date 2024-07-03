from django.http import JsonResponse
from functools import wraps

def api_login_required(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return func(request, *args, **kwargs)
        return JsonResponse({'status': 'error', 'errors': ['No permitido', ]})
    return wrapper