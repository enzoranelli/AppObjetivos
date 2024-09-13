CREATE DATABASE objetivosDB;
USE objetivosDB;

CREATE TABLE Empleado(
	idEmpleado INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
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
    fechaCreacion DATE,
    usuario INT NOT NULL,
    PRIMARY KEY(idObjetivo),
    FOREIGN KEY(usuario) REFERENCES Usuario(idUsuario)
);

CREATE TABLE Puntuacion(
	idPuntuacion INT NOT NULL AUTO_INCREMENT,
    objetivo INT NOT NULL,
    valor INT NOT NULL CHECK(valor BETWEEN 0 AND 100),
    fechaPuntuacion DATE,
    PRIMARY KEY(idPuntuacion),
    FOREIGN KEY(objetivo) REFERENCES Objetivo(idObjetivo)
);