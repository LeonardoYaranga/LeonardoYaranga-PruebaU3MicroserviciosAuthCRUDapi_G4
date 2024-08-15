"# LeonardoYaranga-PruebaU3MicroserviciosAuthCRUDapi_G4" 


crear un archivo .env
Colocar dentro la clave proporcionada por el equipo en este formato: JWT_SECRET=<'claveproporcionadaporelequipo'>

Ejecutar el comando para levantar los dos contenedores

docker-compose up --build -d

Hacer peticion al localhost:3003/auth/login con un email de usuario y contraseña correctos para recibir un token
Sino se tiene cuenta crearla en localhost:3003/auth/register con los campos de email, nombre, apellido y contraseña

Hacer peticion al localhost:3002/payment/getData para ver los pagos de ese usuario, colocando en el bearer de la peticion el token generado previamente
Sino se tiene pagos se los puede crear con localhost:3002/payment/createData con los campo de amount, currency, description, paymentDate, paymentMethod y status(completed, incompleted)
