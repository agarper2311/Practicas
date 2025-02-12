CREATE TABLE IF NOT EXISTS avisos(
	  id SERIAL PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    realizado BOOLEAN NOT NULL,
    ver_avisos TEXT
);

CREATE TABLE IF NOT EXISTS responsables (
    id SERIAL PRIMARY KEY,
    DNI VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(20) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    telefono VARCHAR(12) -- Cantidad de caractéres usados para almacenar el número de teléfono con el prefijo incluido.
);

CREATE TABLE IF NOT EXISTS operaciones (
    id SERIAL PRIMARY KEY,
    descripcion TEXT,
	responsable_id INTEGER REFERENCES responsables(id) ON DELETE SET NULL
);
