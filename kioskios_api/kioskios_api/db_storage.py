from django.core.files.storage import Storage
from supabase import create_client
import os


class DBStorage(Storage):
    url = os.environ.get('SUPABASE_URL')
    key = os.environ.get('SUPABASE_ANON_KEY')
    client = create_client(url, key)

    def __init__(self, option=None):
        pass

    def _open(name, mode='rb'):
        data = DBStorage.client.storage.from_('media').download(name)
        return data

    def _save(name, content):
        DBStorage.client.storage.from_('media').upload(name, content)
        return name
