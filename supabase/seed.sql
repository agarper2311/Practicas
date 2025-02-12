-- Insertar registros en la tabla 'avisos'
INSERT INTO avisos (tipo, realizado, ver_avisos) VALUES
('Mantenimiento', TRUE, 'Revisión mensual completada'),
('Seguridad', FALSE, 'Pendiente revisión de cámaras'),
('Limpieza', TRUE, 'Desinfección realizada en la zona A'),
('Revisión Técnica', FALSE, 'Inspección de equipos programada'),
('Incidencia', TRUE, 'Reporte de avería solucionado');

-- Insertar registros en la tabla 'responsables'
INSERT INTO responsables (DNI, nombre, apellido, telefono) VALUES
('12345678A', 'Carlos', 'Fernández', '600123456'),
('87654321B', 'Laura', 'Gómez', '611654321'),
('13579246C', 'Miguel', 'López', '622987654'),
('24681357D', 'Ana', 'Martínez', '633765432'),
('98765432E', 'Elena', 'Ruiz', '644876543');

-- Insertar registros en la tabla 'operaciones'
INSERT INTO operaciones (descripcion, responsable_id) VALUES
('Revisión del sistema eléctrico', 1),
('Supervisión del personal de limpieza', 2),
('Revisión de protocolos de seguridad', 3),
('Mantenimiento de equipos de climatización', 4),
('Atención a incidencia en zona B', 5);
