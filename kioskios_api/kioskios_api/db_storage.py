from django.core.files.storage import Storage
from supabase import create_client, ClientOptions
import os


class DBStorage(Storage):

    def __init__(self, option=None):
        url = os.environ.get('SUPABASE_URL')
        key = os.environ.get('DB_PASSWORD')
        options = ClientOptions(
            postgrest_client_timeout=7000,
            storage_client_timeout=7000
        )
        self.client = create_client(url, key, options)

    def _open(self, name, mode='rb'):
        data = self.client.storage.from_('media').download(name)
        return data

    def _save(self, name, content):
        self.client.storage.from_('media').upload(name, content)
        return name
    
    def delete(self, name):
        self.client.storage.from_('media').remove(name)

    def exists(self, name):
        return self.client.storage.from_('media').get_public_url(name) is not None
    
    def url(self, name):
        return self.client.storage.from_('media').get_public_url(name)
    
    def size(self, name):
        return self.client.storage.from_('media').download(name).size
    

