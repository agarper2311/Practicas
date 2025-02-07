-- CREACIÓN DE TABLAS PRINCIPALES
CREATE TABLE Operaciones (
    id SERIAL PRIMARY KEY,
    dia DATE NOT NULL,
    hora TIME NOT NULL,
    tiempo INTERVAL NOT NULL,
    observaciones TEXT,
    descripcion TEXT
);

CREATE TABLE Tecnico_Responsable (
    id SERIAL PRIMARY KEY,
    DNI VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    telefono VARCHAR(12) -- Cantidad de caractéres usados para almacenar el número de teléfono con el prefijo incluido.
);

CREATE TABLE Maquinas (
    id SERIAL PRIMARY KEY,
    num_serie VARCHAR(30) UNIQUE NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    anio_fabr DATE NOT NULL,
    ficha_tecnica BYTEA NOT NULL -- Archivo PDF con imágenes, esquema eléctrico y manual de usuarios
);

CREATE TABLE Categoria (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(50) NOT NULL,
    subcategoria VARCHAR(70)
);

CREATE TABLE Compañia (
    id SERIAL PRIMARY KEY,
    CIF VARCHAR(9) UNIQUE NOT NULL,
    nombre VARCHAR(30) NOT NULL,
    contacto VARCHAR(150)
);

CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    telefono VARCHAR(12), -- Cantidad de caractéres usados para almacenar el número de teléfono con el prefijo incluido.
    email VARCHAR(35) UNIQUE NOT NULL
);

CREATE TABLE Ubicacion (
    id SERIAL PRIMARY KEY,
    ciudad VARCHAR(100) NOT NULL,
    CP VARCHAR(10) UNIQUE NOT NULL,
    calle VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    puerta VARCHAR(10)
);

CREATE TABLE Avisos (
    id SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    realizado BOOLEAN NOT NULL,
    ver_avisos TEXT
);

