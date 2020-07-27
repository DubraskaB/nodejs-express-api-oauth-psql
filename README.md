# Instalación y Configuración

## Tecnologias usadas

1. Postgres 9
2. Node 12.18.3
3. Express 4.17

## Pasos a seguir

1. Clonar el repo.

```
git Clone repo
```
2. Ingresar al directorio que contiene el repo.
```
cd nombre_del_repo
```
3. Instalar los paquetes de node.
```
npm install
``` 
4. Configurar la conexión con la base de datos postgres en la ruta 'dataBaseLayer/pgConnection.js'.
```
 user: "postgres",
 host: "localhost",
 database: "postgres",
 password: "postgres",
 port: 5432,
``` 
5. Crear las siguientes tablas dentro de la base de datos postgres que configuro en el punto 4. Se sugiere usar pgAdmin.
```
CREATE TABLE public.users
(
    id serial,
    username text,
    user_password text,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.users
    OWNER to postgres;

CREATE TABLE public.access_tokens
(
    id serial,
    access_token text,
    user_id integer,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.access_tokens
    OWNER to postgres;
``` 
6. En la consola en la ruta donde se encuentre el proyecto lo iniciamos.
```
node index.js
``` 

## Rutas del api
1. Registro de usuario.
```
POST: http://localhost:3000/auth/register

username:nombree
password:clave
grand_type:password
client_id:null
client_secret:null
``` 
2. Login de usuario.
```
POST: http://localhost:3000/auth/login

username:nombree
password:clave
grand_type:password
client_id:null
client_secret:null
``` 
3. Lista las promociones con OAuth
```
POST: http://localhost:3000/api/promotions

Endpoint que responde en formato JSON un listado de promociones con
información dummy.
``` 
4. Detalle de la promoción con OAuth
```
POST: http://localhost:3000/api/promotion

Endpoint que responde en formato JSON el detalle de una promoción con
información dummy.
``` 
