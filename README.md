## Descripcion

El presente repositorio contiene todo el codigo del backend de la aplicacion realizada en el marco de la prueba pactica del proceso de seleccion de PayPros.
Dentro de este documento README se encuentra informacion relacionada a la instalacion e implementacion de la aplicacion y las querys que se deben realizar para montar la base de datos.

## Instalacion

Una vez clonado el repositorio se debe instalar utilizando el siguiente comando en la terminal de la carpeta to-do-back:

```bash
$ npm install
```

Lo primero que se debe hacer para poder correr bien la aplicacion va a ser crear la base de datos. Para esto es necesario contar con un gestor de bases de datos SQL.
En mi caso utilice el gestor tablePlus.

Una vez dentro de nuestro gestor debemos configurar una base de datos utilizando las siguientes querys:

# Creacion de la tabla USERS:

CREATE TABLE users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(255) UNIQUE,
email VARCHAR(255) UNIQUE,
password VARCHAR(255)
);

# Creacion de la tabla LISTS:

CREATE TABLE lists (
list_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
type VARCHAR(255),
deadline DATETIME,
state VARCHAR(255) DEFAULT 'pending',
creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

# Creacion de la tabla TASKS:

CREATE TABLE tasks (
task_id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255),
description TEXT,
dateToComplete DATETIME,
state VARCHAR(255) DEFAULT 'pending',
creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

# Creacion de la tabla UserList:

CREATE TABLE userlist (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
list_id INT,

FOREIGN KEY (user_id) REFERENCES users(user_id),
FOREIGN KEY (list_id) REFERENCES lists(list_id)
);

# Creacion de la tabla UserTask:

model UserTask {
id Int @id @default(autoincrement())
user_id Int
task_id Int

@@map("usertask")
}

# Creacion de la tabla ListTask:

CREATE TABLE listtask (
id INT AUTO_INCREMENT PRIMARY KEY,
list_id INT,
task_id INT,

FOREIGN KEY (list_id) REFERENCES lists(list_id),
FOREIGN KEY (task_id) REFERENCES tasks(task_id)
);

# Luego de correr estas Querys las tablas de la base de datos ya estan listas. Una vez listas las tablas es importante configurar la conexion del Backend con la base de datos.

Para generar esta coneccion es importante seguir estos pasos:

1. crear un archivo ".env" en la raiz de la aplicacion. Debe quedar a la altura de este documento.

2. Me tome la libertad de crear un documento Example.env que muestra como deberia verse el archivo ".env".
   Es necesario copiar el contenido del archivo example y pegarlo en el nuevo archivo ".env".
   El mismo deberia verse mas o menos asi:

SESSION_SECRET="AppSecret" ----> Con esto se van a firmar los permisos de JWT

DATABASE_URL=mysql://root:root@localhost:3306/to-do ----> La database url va a ser diferente cuando generes la conexion.

3. Crear la database url.

La database url con prisma tiene una estructura que sigue estos lineamientos:

DATABASE_URL=mysql://<usuario>:<contraseña>@<host>:<puerto>/<nombre_base_de_datos>

Al crear la conexion en tableplus se deben asignar valores a las variables de tu conexion. Esos valores se deben ingresar en la DATABASE_URL para que el backend pueda conectarse con la base de datos.

4. Sustituir en el archivo ".env" la database url por la creada en el paso 3.

# crear un cliente de prisma

Luego de tener configurada la conexion con la base de datos es necesario seguir estos pasos para crear el cliente de prisma que sera nuestra ORM de base de datos.

1. Abrir una terminal desde la carpeta de prisma.
   Esto se puede hacer dandole click derecho a la carpeta Prisma y seleccionando la opcion "abrir en terminal integrado".
   La carpeta prisma se encuentra dentro de la carpeta "src".

2. Una vez dentro de nuestra terminal de prisma, debemos correr el siguiente comando:

   -- npx prisma generate

Este comando va a crear el cliente.

!! En caso de que nos de un error !!

npm install -g prisma

npx prisma generate

Luego de esto deberiamos tener nuestro cliente de Prisma configurado.

Una vez configurado todo esto la aplicacion ya deberia poder ser capaz de correr en tu servidor.

## Correr la app

Para correr el servidor se debe correr el siguiente comando desde la terminal de la carpeta to-do-back:

```bash
# development
$ npm run start

------------------------------------------------------------

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Consideraciones finales

Esta parte de la prueba fue bastante desafiante ya que fue necesario investigar mucho para lograr implementar varias tecnologias a las que no estaba acostumbrado.

En mi caso particular estaba acostumbrado a crear el backend de mis aplicaciones usando Node.js pero acompañado de Express.js y con la ORM de sql sequelize.

Fue muy desafiante aprender a utilizar un nuevo framework de node como lo es NestJS. Tal vez no haya utilizado las mejores practicas, pero creo que dado el poco tiempo que tenia esta bastante prolijo.
Para aprender NestJS realice un curso de Udemy. Se puede encontrar mi certificacion de dicho curso en mi perfil de linkedIn.

Una de las partes que mas tiempo me llevo fue el poder implementar Prisma de manera apropiada debido a la creacion del cliente. Tuve que buscar mucha informacion en internet para conseguir implementarlo de una forma funcional.

Por ultimo, esta es la primera vez que realizo un proyecto de backend utilizando TypeScript.
Para poder llevar a cabo este proyecto realice otro curso de Udemy centrado en Typescript. Tambien se puede encontrar mi certificacion en LinkedIn.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
