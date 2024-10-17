CREATE DATABASE objetivosDB;
DROP DATABASE objetivosDB;
USE objetivosDB;

CREATE TABLE Empleado(
	idEmpleado INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    puesto VARCHAR(100) NOT NULL,
    area VARCHAR(100) NOT NULL,
    PRIMARY KEY(idEmpleado)
);

CREATE TABLE Usuario(
	idUsuario INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    usuarioPassword VARCHAR(200) NOT NULL,
    rol ENUM('user','admin') NOT NULL,
    empleado INT NOT NULL,
    PRIMARY KEY(idUsuario),
    FOREIGN KEY(empleado) REFERENCES Empleado(idEmpleado) ON DELETE CASCADE
);

CREATE TABLE Objetivo(
	idObjetivo INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(2500) NOT NULL,
    peso FLOAT CHECK(peso BETWEEN 0 AND 100),
    fechaInicio DATE,
    fechaFinal DATE,
    PRIMARY KEY(idObjetivo)
);



CREATE TABLE ObjetivoEmpleado(
    idObjetivoEmpleado INT NOT NULL AUTO_INCREMENT,
    fechaAsignacion DATE,
    empleado INT,
    objetivo INT,
    
    PRIMARY KEY(idObjetivoEmpleado),
    FOREIGN KEY(empleado) REFERENCES Empleado(idEmpleado) ON DELETE CASCADE,
    FOREIGN KEY(objetivo) REFERENCES Objetivo(idObjetivo) ON DELETE CASCADE,
    UNIQUE(empleado, objetivo)
);

CREATE TABLE Puntuacion(
	idPuntuacion INT NOT NULL AUTO_INCREMENT,
    objetivo INT NOT NULL,
    valor INT NOT NULL CHECK(valor BETWEEN 0 AND 100),
    fechaPuntuacion DATE,
    PRIMARY KEY(idPuntuacion),
    FOREIGN KEY(objetivo) REFERENCES ObjetivoEmpleado(idObjetivoEmpleado)  ON DELETE CASCADE
);

drop table ObjetivoEmpleado;
drop table Puntuacion;
drop table Objetivo;
drop table Usuario;
drop table Empleado;

/*datos prueba*/



INSERT INTO Empleado VALUES (0,'Enzo Ranelli','Operador NOC','Banco BICE');
INSERT INTO Empleado VALUES (0,'Juan Perez','Project Manager','Operaciones IT');
SELECT * FROM Empleado;
SELECT * FROM Usuario;
DELETE FROM Empleado WHERE IdEmpleado = 1;

INSERT INTO Usuario VALUES(0,'enzo.ranelli@gmail.com','contraseña','user',1);

DELETE FROM Empleado WHERE idEmpleado=1;



SELECT oe.objetivo,o.titulo,o.peso,o.fechaInicio, o.fechaFinal, oe.fechaAsignacion FROM Objetivo o JOIN ObjetivoEmpleado oe ON o.idObjetivo= oe.objetivo WHERE oe.empleado = 2;

INSERT INTO Objetivo VALUES(0,'Certificaciones','El objetivo sera completar 3 certificaciones este semestre',50,'2024-09-01','2024-10-10');
SELECT * FROM Objetivo;
DELETE FROM Objetivo;
SELECT * FROM Objetivo ORDER BY idObjetivo DESC LIMIT 1;
UPDATE Objetivo
SET descripcion = 'Actualizado papa de dio'
WHERE idObjetivo = 1;
SELECT * FROM Objetivo WHERE idObjetivo = 'sdfgsdfg';



INSERT INTO ObjetivoEmpleado VALUES(0,1,1,50);



SELECT * FROM ObjetivoEmpleado;
DROP TABLE ObjetivoEmpleado;
DELETE FROM ObjetivoEmpleado;

INSERT INTO Puntuacion VALUES(0,1,40,'2024-09-24');
INSERT INTO Puntuacion VALUES(0,1,60,'2024-10-24');
SELECT * FROM Puntuacion;
DROP TABLE Puntuacion;
DELETE from Puntuacion;
/*Lista de objetivos por usuario */

SELECT e.nombre, o.titulo, o.fechaInicio, o.fechaFinal, o.peso, p.valor, (o.peso * p.valor/100) AS despeno FROM ObjetivoEmpleado oe
JOIN Empleado e on oe.empleado = e.idEmpleado
JOIN Objetivo o on oe.objetivo = o.idObjetivo
JOIN Puntuacion p on oe.IdObjetivoEmpleado = p.objetivo
WHERE idEmpleado = 1;

SELECT *, (o.peso * p.valor/100) AS despeno FROM ObjetivoEmpleado oe
JOIN Empleado e on oe.empleado = e.idEmpleado
JOIN Objetivo o on oe.objetivo = o.idObjetivo
JOIN Puntuacion p on oe.IdObjetivoEmpleado = p.objetivo
WHERE idEmpleado = 1;

SELECT oe.*, e.nombre, e.puesto, e.area, o.titulo, o.descripcion, o.peso, o.fechaInicio, o.fechaFinal, p.idPuntuacion, p.valor, p.fechaPuntuacion, 
       (o.peso * p.valor / 100) AS despeno
FROM ObjetivoEmpleado oe
JOIN Empleado e ON oe.empleado = e.idEmpleado
JOIN Objetivo o ON oe.objetivo = o.idObjetivo
JOIN Puntuacion p ON oe.idObjetivoEmpleado = p.objetivo
JOIN (
    SELECT p.objetivo, MAX(p.idPuntuacion) AS maxPuntuacion
    FROM Puntuacion p
    GROUP BY p.objetivo
) maxP ON p.objetivo = maxP.objetivo AND p.idPuntuacion = maxP.maxPuntuacion
WHERE e.idEmpleado = 1;

/*Verifiicar peso de los objetivos asignados*/
SELECT SUM(peso) AS suma_peso_actual
FROM ObjetivoEmpleado
WHERE empleado = 1;

SELECT oe.idObjetivoEmpleado, o.titulo, p.valor, o.peso, 
       (o.peso * p.valor / 100) AS despeno
        FROM ObjetivoEmpleado oe
        JOIN Empleado e ON oe.empleado = e.idEmpleado
        JOIN Objetivo o ON oe.objetivo = o.idObjetivo
        JOIN Puntuacion p ON oe.idObjetivoEmpleado = p.objetivo
        JOIN (
            SELECT p.objetivo, MAX(p.idPuntuacion) AS maxPuntuacion
            FROM Puntuacion p
            GROUP BY p.objetivo
        ) maxP ON p.objetivo = maxP.objetivo AND p.idPuntuacion = maxP.maxPuntuacion
        WHERE e.idEmpleado = 1
        ORDER BY idOBjetivoEmpleado;

