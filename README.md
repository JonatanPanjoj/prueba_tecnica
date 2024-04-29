# Instrucciones de Ejecución

## Cómo ejecutar el Backend

Desde la raíz del proyecto:

```bash
C:\[ruta_del_proyecto]\prueba_tecnica> npm install
C:\[ruta_del_proyecto]\prueba_tecnica> npm start
```

## Cómo ejecutar el Frontend

Desde la carpeta "client":
```bash

C:\[ruta_del_proyecto]\prueba_tecnica\client> npm install
C:\[ruta_del_proyecto]\prueba_tecnica\client> npm run dev
```

# Prueba Técnica: Desarrollo de Aplicación Web en React y API REST en Node.js

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web utilizando React para el frontend y una API REST en Node.js para el backend. La aplicación permite a los usuarios registrarse, iniciar sesión y realizar operaciones básicas de CRUD (Crear, Leer, Actualizar y Borrar) en una lista de tareas.

## Requerimientos del Frontend (React)

- **Página de Registro:** Formulario de registro que solicita nombre de usuario, correo electrónico y contraseña. Validación de entrada en el lado del cliente y envío de la información al backend para el registro del usuario.
- **Página de Inicio de Sesión:** Formulario de inicio de sesión que solicita correo electrónico y contraseña. Validación de entrada en el lado del cliente y envío de la información al backend para autenticar al usuario.
- **Página Principal:** Mostrará la lista de tareas del usuario, con funcionalidades para agregar, marcar como completada/no completada, editar y eliminar tareas.

## Requerimientos del Backend (Node.js)

- **Autenticación y Registro de Usuarios:** Endpoints para registro y autenticación de usuarios utilizando JSON Web Tokens (JWT). Almacenamiento de información de usuario en una base de datos.
- **Gestión de Tareas:** Endpoints para operaciones CRUD en la lista de tareas, asociadas al usuario que las creó.

## Consideraciones Generales

- Utilizar React Hooks y React Router.
- Utilizar librerías como Axios para peticiones HTTP desde el frontend.
- Implementar medidas de seguridad, como protección contra ataques de CSRF en el backend.
- Documentar el código de manera clara y concisa.
- Implementar buenas prácticas de diseño de API REST.

