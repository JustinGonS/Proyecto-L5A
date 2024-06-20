-- Creación de la base de datos
CREATE DATABASE VentaRopa;
GO
USE VentaRopa;
GO

-- Tabla ROL
CREATE TABLE ROL (
    rolID INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(255)
);
GO

-- Tabla USUARIO
CREATE TABLE USUARIO (
    NombreUsuario VARCHAR(50) PRIMARY KEY,
    Contraseña VARCHAR(255),
    rolID INT,
    FOREIGN KEY (rolID) REFERENCES ROL(rolID)
);
GO

-- Tabla TARJETA
CREATE TABLE TARJETA (
    tarjetaID INT PRIMARY KEY IDENTITY(1,1),
    numero VARCHAR(20),
    CVC VARCHAR(5),
    fechaVencimiento DATE
);
GO

-- Tabla TOKEN_PAGO
CREATE TABLE TOKEN_PAGO (
    tokenID INT PRIMARY KEY IDENTITY(1,1),
    tarjetaID INT,
    descripcion VARCHAR(255),
    FOREIGN KEY (tarjetaID) REFERENCES TARJETA(tarjetaID)
);
GO

-- Tabla CLIENTE
CREATE TABLE CLIENTE (
    clienteID INT PRIMARY KEY IDENTITY(1,1),
    NombreUsuario VARCHAR(50),
    tarjetaID INT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    nacimiento DATE,
    direccion VARCHAR(255),
    pais VARCHAR(50),
    FOREIGN KEY (NombreUsuario) REFERENCES USUARIO(NombreUsuario),
    FOREIGN KEY (tarjetaID) REFERENCES TARJETA(tarjetaID)
);
GO

-- Tabla ESTADO_ORDEN
CREATE TABLE ESTADO_ORDEN (
    estadoID INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(50)
);
GO

-- Tabla ORDEN
CREATE TABLE ORDEN (
    ordenID INT PRIMARY KEY IDENTITY(1,1),
    clienteID INT,
    ordenFecha DATE,
    nombreD VARCHAR(50),
    direccionD VARCHAR(255),
    estadoID INT,
    FOREIGN KEY (clienteID) REFERENCES CLIENTE(clienteID),
    FOREIGN KEY (estadoID) REFERENCES ESTADO_ORDEN(estadoID)
);
GO

-- Tabla CATEGORIA
CREATE TABLE CATEGORIA (
    categoriaID INT PRIMARY KEY IDENTITY(1,1),
    descripcion VARCHAR(50)
);
GO

-- Tabla PRODUCTO
CREATE TABLE PRODUCTO (
    productoID INT PRIMARY KEY IDENTITY(1,1),
    categoriaID INT,
    descripcion VARCHAR(255),
    talla VARCHAR(10),
    marca VARCHAR(50),
    precio DECIMAL(10, 2),
    imagen VARCHAR(255),
    stock INT,
    FOREIGN KEY (categoriaID) REFERENCES CATEGORIA(categoriaID)
);
GO

-- Tabla DETALLES_ORDEN
CREATE TABLE DETALLES_ORDEN (
    ordenID INT,
    productoID INT,
    precio DECIMAL(10, 2),
    cantidad INT,
    PRIMARY KEY (ordenID, productoID),
    FOREIGN KEY (ordenID) REFERENCES ORDEN(ordenID),
    FOREIGN KEY (productoID) REFERENCES PRODUCTO(productoID)
);
GO
