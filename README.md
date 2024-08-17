# Proyecto de Microservicios: Autenticación y Gestión de Pagos

Este proyecto consiste en dos microservicios desarrollados con NestJS:

- **Authentication_Login**: Maneja la autenticación y registro de usuarios, generando tokens JWT para la autenticación.
- **APIPagos**: Un CRUD para la gestión de pagos, donde solo los usuarios autenticados pueden realizar operaciones.

## Instrucciones para Ejecutar el Proyecto

### Requisitos Previos
- Docker y Docker Compose instalados en tu sistema.
- Node.js y npm (opcional, si deseas ejecutar los microservicios fuera de Docker).

### Configuración Inicial
 
 1. **Clonar el Repositorio:**
```bash
  git clone <URL-del-repositorio>
    cd <directorio-del-repositorio>
```
 ### Crear el archivo `.env`:
En la raíz de ambos microservicios y en la raiz de este proyecto general crea un archivo `.env` con el siguiente contenido:

```bash
JWT_SECRET='alesso-quesso'
```

Esta clave será utilizada para la generación y verificación de los tokens JWT.
 
 ### Ejecución con Docker

 **Levantar los Contenedores:**
```bash
docker-compose up --build -d
```

### Interacción con los Microservicios:

#### Autenticación:

- **Registro:** Si no tienes una cuenta, regístrate enviando una petición `POST` a `http://localhost:3003/auth/register` con los campos `email`, `nombre`, `apellido`, y `contraseña`.
- **Login:** Para autenticarte, envía una petición `POST` a `http://localhost:3003/auth/login` con tu `email` y `contraseña`. Si las credenciales son correctas, recibirás un token JWT.

#### Gestión de Pagos:

- **Consultar Pagos:** Envía una petición `GET` a `http://localhost:3002/payment/getData` incluyendo el token JWT en el encabezado `Authorization` como `Bearer <tu-token>`(Esto se hace en general para todas la peticiones, sino no estaras autorizado. Esto te devolverá los pagos asociados a tu cuenta.
- **Crear un Pago:** Si no tienes pagos, puedes crear uno enviando una petición `POST` a `http://localhost:3002/payment/createData` con los campos `amount`, `currency`, `description`, `paymentDate`, `paymentMethod`, y `status` (puede ser `completed` o `incompleted`).
- **Consultar Pago especifico:** Envía una petición `GET` a `http://localhost:3002/payment/getDataById/:id` El id debe ser el que registra firebase en la base de datos(Esto del id funciona de la misma manera para el update y delete).
- **Editar un Pago:** Adicionalmente puedes editar el pago con la peticion `PUT` a `http://localhost:3002/payment/updateData/:id`
- **Eliminar un Pago:** Finalmente puedes eliminar el pago con la peticion `DELETE` a `http://localhost:3002/payment/deleteData/:id`
## Dependencias Necesarias
 **Microservicio de Autenticación:**
- @nestjs/common
- @nestjs/jwt
- @nestjs/passport
- passport
- passport-jwt

 **Microservicio de Pagos:**
- @nestjs/common
- @nestjs/jwt
- @nestjs/typeorm
- typeorm
