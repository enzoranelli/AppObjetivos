CREATE DATABASE objetivosDB;
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
    FOREIGN KEY(empleado) REFERENCES Empleado(idEmpleado)
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
    FOREIGN KEY(empleado) REFERENCES Empleado(idEmpleado),
    FOREIGN KEY(objetivo) REFERENCES Objetivo(idObjetivo)
);

CREATE TABLE Puntuacion(
	idPuntuacion INT NOT NULL AUTO_INCREMENT,
    objetivo INT NOT NULL,
    valor INT NOT NULL CHECK(valor BETWEEN 0 AND 100),
    fechaPuntuacion DATE,
    PRIMARY KEY(idPuntuacion),
    FOREIGN KEY(objetivo) REFERENCES ObjetivoEmpleado(idObjetivoEmpleado)
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

DELETE FROM Empleado WHERE idEmpleado = 2;

INSERT INTO Usuario VALUES(0,'enzo.ranelli@gmail.com','contraseña','user',1);
SELECT * FROM Usuario;


INSERT INTO Objetivo VALUES(0,'Certificaciones','El objetivo sera completar 3 certificaciones este semestre',50,'2024-09-01','2024-10-10');
SELECT * FROM Objetivo;
DELETE FROM Objetivo;
SELECT * FROM Objetivo ORDER BY idObjetivo DESC LIMIT 1;

SELECT * FROM Objetivo WHERE idObjetivo = 'sdfgsdfg';

SET SQL_SAFE_UPDATES= 0;

INSERT INTO ObjetivoEmpleado VALUES(0,1,1,50);
SELECT * FROM ObjetivoEmpleado;



INSERT INTO Puntuacion VALUES(0,1,40,'2024-09-24');
INSERT INTO Puntuacion VALUES(0,1,60,'2024-10-24');
SELECT * FROM Puntuacion;


/*Lista de objetivos por usuario */
SELECT e.nombre, o.titulo, o.fechaInicio, o.fechaFinal, oe.peso, p.valor, (oe.peso * p.valor/100) AS despeno FROM ObjetivoEmpleado oe
JOIN Empleado e on oe.empleado = e.idEmpleado
JOIN Objetivo o on oe.objetivo = o.idObjetivo
JOIN Puntuacion p on oe.IdObjetivoEmpleado = p.objetivo;

/*Verifiicar peso de los objetivos asignados*/
SELECT SUM(peso) AS suma_peso_actual
FROM ObjetivoEmpleado
WHERE empleado = 1;


