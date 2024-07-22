# KiosKios

KiosKios es una aplicación web diseñada para modernizar la compra y venta de productos en los kioscos de la Universidad Nacional de San Agustín. Esta plataforma utiliza una arquitectura moderna que separa el backend (Django y Django Rest Framework) del frontend (Angular), desplegada en la nube mediante Vercel y con almacenamiento de datos en Supabase.

## Estado del Proyecto

🚧 **Beta** 🚧

KiosKios se encuentra actualmente en versión beta. Estamos trabajando continuamente para mejorar y expandir sus funcionalidades.

## Características Principales

- Autenticación de usuarios (incluyendo integración con Google)
- Gestión de kioscos virtuales
- Catálogo de productos con categorías
- Sistema de ventas
- Diferentes roles de usuario (comprador, dueño de kiosco, administrador)

## Tecnologías Utilizadas

- Backend: Django y Django Rest Framework
- Frontend: Angular
- Base de Datos: Supabase (PostgreSQL)
- Despliegue: Vercel (Funciones Serverless)

## Requisitos

- Python 3.12
- Node.js (para Angular)

## Instalación y Configuración

1. Clonar la rama `localhost` del repositorio:
   ```
   git clone -b localhost https://github.com/cmestasz/KiosKios.git
   ```

2. Instalar las dependencias del backend:
   ```
   cd kioskios_api
   pip install -r requirements.txt
   ```

3. Instalar las dependencias del frontend:
   ```
   cd ../kioskios_frontend
   npm install
   ```

4. Ejecutar el servidor backend:
   ```
   python manage.py runserver
   ```

5. En otra terminal, ejecutar el servidor frontend:
   ```
   ng serve
   ```

## Demo en Vivo

Puedes ver una demostración en vivo de KiosKios en: [https://kios-kios.vercel.app/](https://kios-kios.vercel.app/)

## Autores

- Dolly Yadhira Mollo Chuquicaña
- Christian Raul Mestas Zegarra
- Luis Gustavo Sequeiros Condori

## Licencia

Este proyecto es software propietario y su uso está restringido. Todos los derechos reservados.