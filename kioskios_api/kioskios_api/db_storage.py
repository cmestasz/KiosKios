from django.core.files.storage import Storage
import boto3
import os


class DBStorage(Storage):

    def __init__(self, option=None):
        try:
            '''
            self.client = boto3.client('s3',
                                       endpoint_url=os.environ.get('ST_ENDPOINT'),
                                       aws_access_key_id=os.environ.get('ST_KEY_ID'),
                                       aws_secret_access_key=os.environ.get('ST_SECRET_KEY'),
                                       region_name='us-east-1')
                                       '''
            self.client = boto3.client('s3',
                                       endpoint_url='https://xxkygblvrfifljmmaxjn.supabase.co/storage/v1/s3',
                                        aws_access_key_id='36ec8546d1c5b222f5f1185d2d46ea21',
                                        aws_secret_access_key='6c008568c59d7b7f93e7c830798d1db96a3b51d1c0716cee9dca685b1ee4e0fd',
                                        region_name='us-east-1')
        except Exception as e:
            print("Error creating client", e)

    def _open(self, name, mode='rb'):
        with open(name, 'wb') as data:
            try:
                data = self.client.download_fileobj('media', name, data)
                return data
            except Exception as e:
                print("Error downloading", e)

    def _save(self, name, content):
        print("Saving", name)
        try:
            self.client.upload_fileobj(content, 'media', name)
        except Exception as e:
            print("Error uploading", e)
        return name

    def delete(self, name):
        self.client.delete_object(Bucket='media', Key=name)

    def exists(self, name):
        try:
            self.client.head_object(Bucket='media', Key=name)
            return True
        except Exception as e:
            return False

    def url(self, name):
        return f'https://xxkygblvrfifljmmaxjn.supabase.co/storage/v1/object/public/media/{name}'

    def size(self, name):
        return self.client.head_object(Bucket='media', Key=name)['ContentLength']
