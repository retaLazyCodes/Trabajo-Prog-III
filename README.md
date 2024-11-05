# Trabajo-Prog-III

[![ estilo js-semistandard ](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)

### Trabajo Integrador - Programación III

# Índice

1. [Integrantes del Proyecto](#integrantes-del-proyecto)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Objetivo](#objetivo)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Dependencias](#dependencias)
6. [Instalación y Configuración](#instalación-y-configuración)
7. [Uso del Proyecto](#uso-del-proyecto)
8. [Licencia](#licencia)

## Integrantes del Proyecto

- **Gerardi, Mauro Alejandro**

- **Gerol, Javier Ignacio**

- **Retamar, Brian Leonel**

- **Romanoli, José Alberto**

## Descripción del Proyecto

La concesionaria de automóviles Prog.III para la cual usted trabaja en el área de desarrollo web ha identificado problemas en el control de la atención post-venta de los vehículos que comercializa, motivo por el cual ha decidido iniciar un nuevo proyecto a implementarse antes de fin de año.

El proyecto consiste en desarrollar una API Rest para gestionar reclamos. Esta API deberá incluir un sistema de autenticación y autorización con tres perfiles distintos: administrador, empleado y cliente.

La API Rest debe asegurar un manejo eficiente y seguro de los reclamos, garantizando que cada perfil tenga acceso únicamente a las funciones correspondientes a sus responsabilidades. Además se espera que sea segura, eficiente y fácil de integrar con los sistemas actuales de la empresa.

## Objetivo

Son objetivos de este Trabajo Final Integrador que el estudiante:

- Ponga en práctica todos los conocimientos adquiridos durante el cursado de la asignatura
  desarrollando una API REST.

- Defina la estructura de los documentos y las relaciones entre estos.

- Interactúe con una API Rest intercambiando información.

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

#### 1. **/config**

Contiene archivos de configuración como la conexión a la base de datos, variables de entorno, o cualquier configuración del servidor.

#### 2. **/controllers**

Maneja la lógica de negocio de la aplicación. Cada controlador se encarga de recibir, procesar y enviar la respuesta adecuada para una solicitud HTTP en un endpoint.

#### 3. **/middlewares**

Aquí se ubican los middlewares que interceptan las solicitudes antes de llegar al controlador, por ejemplo, para autenticación.

#### 4. **/models**

Define los modelos de datos que representan entidades de la base de datos. En cada archivo se especifican las propiedades del modelo y métodos para realizar operaciones CRUD.

#### 5. **/public**

Se utiliza para servir archivos estáticos como imágenes, CSS, JS, etc. La subcarpeta /uploads almacenará archivos cargados por los usuarios, como imágenes de perfil.

#### 6. **/routes**

Define las rutas de la aplicación. Cada archivo en esta carpeta contiene la definición de los endpoints y qué controladores manejan las solicitudes.

#### 7. **/schemas**

Aquí se colocan los esquemas de validación, que garantizan que los datos enviados por el cliente tengan el formato correcto.

#### 8. **/services**

Los servicios encapsulan la lógica de procesos específicos que pueden ser reutilizados en varios controladores.

#### 9. **/templates**

Contiene plantillas de correos electrónicos o documentos que se generen dinámicamente.

#### 10. **/docs**

Contiene las colecciones utilizadas en Postman y los archivos necesarios para las pruebas.

#### 11. **app.js**

Archivo principal que configura el servidor Express. Aquí se cargan los middlewares, rutas, y se inicializa la aplicación.

#### 12. **README.md**

Instrucciones y documentación básica sobre cómo ejecutar el proyecto.

#### 13. **.gitignore**

Archivo que define qué archivos o carpetas deben ser ignorados por Git (como node_modules o archivos de configuración locales).

#### 14. **package.json**

Definen las dependencias del proyecto y versiones exactas para mantener consistencia en los entornos de desarrollo.

## Dependencias

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final

- [Express](https://www.npmjs.com/package/express): Framework minimalista para aplicaciones web en Node.js.
- [Dotenv](https://www.npmjs.com/package/dotenv): Carga variables de entorno desde un archivo `.env`.
- [MySQL2](https://www.npmjs.com/package/mysql2): Cliente MySQL para Node.js.
- [Handlebars](https://www.npmjs.com/package/handlebars): Motor de plantillas para generar HTML dinámico.
- [Joi](https://www.npmjs.com/package/joi): Librería para validación de datos.
- [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken): Implementación de JSON Web Tokens (JWT) para autenticación.
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs): Implementación de bcrypt.js para autenticación.
- [Multer](https://www.npmjs.com/package/multer): Implementación de Multer para el manejo de archivos.
- [Nodemailer](https://www.npmjs.com/package/nodemailer): Implementación de Nodemailer para generar HTML dinámico.
- [Nodemailer-express-handlebars](https://www.npmjs.com/package/nodemailer-express-handlebars): Implementación de Nodemailer para generar HTML dinámico.
- [Csv-writer](https://www.npmjs.com/package/csv-writer): Implementación de Csv-writer para generar archivos CSV.
- [Puppeteer](https://www.npmjs.com/package/puppeteer): Implementación de Puppeteer para controlar Chrome o Firefox a través del protocolo DevTools o WebDriver BiDi.

### Librerías de desarrollo

- [Nodemon](https://www.npmjs.com/package/nodemon): Herramienta que reinicia automáticamente el servidor al detectar cambios en los archivos durante el desarrollo.
- [Semistandard](https://www.npmjs.com/package/semistandard): Herramienta que comprueba el estilo de todos los archivos JavaScript durante el desarrollo.

## Instalación y Configuración

Para instalar y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Maure-dev/Trabajo-Prog-III.git
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Inicia el servidor**

   ```bash
   npm run dev
   ```

   o

   ```bash
   npm run start
   ```

## Uso del Proyecto

Una vez iniciado el proyecto, puedes acceder a la página principal en http://localhost:3000/. Si haces cambios en el proyecto, el servidor se reiniciará automáticamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Véase el archivo LICENSE.
