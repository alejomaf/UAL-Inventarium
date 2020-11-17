-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-09-2020 a las 01:34:50
-- Versión del servidor: 10.4.13-MariaDB
-- Versión de PHP: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ualinventarium`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `idConfiguracion` int(11) NOT NULL,
  `ip` varchar(45) DEFAULT NULL,
  `mac` varchar(45) DEFAULT NULL,
  `boca` varchar(45) DEFAULT NULL,
  `armario` varchar(45) DEFAULT NULL,
  `usuario` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `Objeto_idObjeto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `configuracion`
--

INSERT INTO `configuracion` (`idConfiguracion`, `ip`, `mac`, `boca`, `armario`, `usuario`, `contrasena`, `Objeto_idObjeto`) VALUES
(2, '192.168.19.2', 'AA:BC:34:82', 'Tres', '1', 'user', 'user', 5),
(6, '192.168.35.4', 'AA:BC:34:82', '3C', '2', 'user', 'user', 10),
(7, '192.168.38.2', 'AL:EJ:OS:OY', '1K', '5', 'revoltosa', 'casera', 6),
(8, '192.168.40.2', 'AA:AA:AA:AA', '4F', '4', 'alejo', 'ojela', 6),
(9, '192.168.35.6', 'FF:FF:FF:FF', '45', '3', 'root', 'toor', 5),
(10, '192.168.15.2', 'AB:CD:EF:GH', '9F', '4G', 'mariano', 'rajoy', 4),
(12, '1111', '1111', '1111', '1111', '1111', '1111', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupoobjetos`
--

CREATE TABLE `grupoobjetos` (
  `idGrupoObjetos` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `marca` varchar(45) DEFAULT NULL,
  `modelo` varchar(45) DEFAULT NULL,
  `cantidadDisponible` int(11) DEFAULT NULL,
  `tipo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupoobjetos`
--

INSERT INTO `grupoobjetos` (`idGrupoObjetos`, `cantidad`, `nombre`, `imagen`, `marca`, `modelo`, `cantidadDisponible`, `tipo`) VALUES
(1, 0, 'Microordenador', 'imagen de raspberry', '', '4 B', 0, 0),
(2, 23, 'Pantalla 24\"', 'imagen de pantalla', 'ASUS', 'UltraWide', 23, 0),
(6, 0, 'Hola', '', 'Hola', 'Hola', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto`
--

CREATE TABLE `objeto` (
  `idObjeto` int(11) NOT NULL,
  `mejorasEquipo` varchar(45) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL,
  `Ubicacion_idUbicacion` int(11) NOT NULL,
  `disponible` tinyint(4) NOT NULL,
  `eliminado` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `objeto`
--

INSERT INTO `objeto` (`idObjeto`, `mejorasEquipo`, `codigo`, `GrupoObjetos_idGrupoObjetos`, `Ubicacion_idUbicacion`, `disponible`, `eliminado`) VALUES
(4, '', 123421, 1, 13, 1, 0),
(5, 'Presenta muchas mejoras', 28395190, 1, 17, 1, 0),
(6, 'Es más grande de lo normal', 293051232, 2, 7, 1, 0),
(10, 'No tiene nada interesante', 0, 2, 14, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestado`
--

CREATE TABLE `prestado` (
  `idPrestado` int(11) NOT NULL,
  `retiradoPor` varchar(45) DEFAULT NULL,
  `fechaSalida` date DEFAULT NULL,
  `fechaEntrega` date DEFAULT NULL,
  `fechaEstimadaEntrega` date DEFAULT NULL,
  `Usuario_idUsuario` int(11) NOT NULL COMMENT 'Enviado por\n',
  `Objeto_idObjeto` int(11) NOT NULL,
  `Objeto_GrupoObjetos_idGrupoObjetos` int(11) NOT NULL,
  `Objeto_Ubicacion_idUbicacion` int(11) NOT NULL,
  `estado` TINYINT NULL,
  `solicitado` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prestado`
--

INSERT INTO `prestado` (`idPrestado`, `retiradoPor`, `fechaSalida`, `fechaEntrega`, `fechaEstimadaEntrega`, `Usuario_idUsuario`, `Objeto_idObjeto`, `Objeto_GrupoObjetos_idGrupoObjetos`, `Objeto_Ubicacion_idUbicacion`, `solicitado`) VALUES
(3, 'Alejo Martín Arias Filippo', '0000-00-00', '0000-00-00', '2020-07-29', 1, 4, 1, 13, '2020-07-25'),
(4, 'Emma', '2020-07-29', '2020-08-07', '2020-08-26', 2, 5, 1, 17, '2020-07-25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `idUbicacion` int(11) NOT NULL,
  `ubicacion` varchar(45) NOT NULL,
  `planta` varchar(45) NOT NULL,
  `edificio` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`idUbicacion`, `ubicacion`, `planta`, `edificio`) VALUES
(1, 'Despacho 3', '2', 'CITE III'),
(7, 'Despacho 5', '2', 'CITE IV'),
(9, 'Despacho 6', '5', 'CITE I'),
(10, 'Despacho 1', '0', 'CITE IV'),
(11, 'Despacho 15', '1', 'CITE III'),
(12, 'Despacho 16', '1', 'CITE III'),
(13, 'Despacho 16', '2', 'CITE III'),
(14, 'Despacho 7', '1', 'CITE IV'),
(15, 'Despacho 23', '0', 'CITE III'),
(16, 'Despacho 85', '1', 'CITE IV'),
(17, 'Despacho 43', '0', 'CITE IV');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `contrasena` varchar(45) DEFAULT NULL,
  `correoElectronico` varchar(45) DEFAULT NULL,
  `rango` int(1) DEFAULT NULL,
  `departamento` int(1) DEFAULT NULL,
  `telefono` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombre`, `contrasena`, `correoElectronico`, `rango`, `departamento`, `telefono`) VALUES
(1, 'admin', 'admin', 'ualinventarium@gmail.com', 0, 0, 674915779),
(2, 'Usuario mas guay', 'usuario', 'usuariomasguay@gmail.com', 0, 1, 675345294),
(4, 'usuario2', 'usuario2', 'usuario3@gmail.com', -1, 1, 674914599);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`idConfiguracion`),
  ADD KEY `fk_Configuracion_Objeto1_idx` (`Objeto_idObjeto`);

--
-- Indices de la tabla `grupoobjetos`
--
ALTER TABLE `grupoobjetos`
  ADD PRIMARY KEY (`idGrupoObjetos`);

--
-- Indices de la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD PRIMARY KEY (`idObjeto`,`GrupoObjetos_idGrupoObjetos`,`Ubicacion_idUbicacion`),
  ADD KEY `fk_Objeto_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`),
  ADD KEY `fk_Objeto_Ubicacion1_idx` (`Ubicacion_idUbicacion`);

--
-- Indices de la tabla `prestado`
--
ALTER TABLE `prestado`
  ADD PRIMARY KEY (`idPrestado`,`Usuario_idUsuario`),
  ADD KEY `fk_Prestado_Usuario1_idx` (`Usuario_idUsuario`),
  ADD KEY `fk_Prestado_Objeto1_idx` (`Objeto_idObjeto`,`Objeto_GrupoObjetos_idGrupoObjetos`,`Objeto_Ubicacion_idUbicacion`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`idUbicacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `idConfiguracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `grupoobjetos`
--
ALTER TABLE `grupoobjetos`
  MODIFY `idGrupoObjetos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `objeto`
--
ALTER TABLE `objeto`
  MODIFY `idObjeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `prestado`
--
ALTER TABLE `prestado`
  MODIFY `idPrestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `idUbicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `fk_Configuracion_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD CONSTRAINT `fk_Objeto_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Objeto_Ubicacion1` FOREIGN KEY (`Ubicacion_idUbicacion`) REFERENCES `ubicacion` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prestado`
--
ALTER TABLE `prestado`
  ADD CONSTRAINT `fk_Prestado_Objeto1` FOREIGN KEY (`Objeto_idObjeto`,`Objeto_GrupoObjetos_idGrupoObjetos`,`Objeto_Ubicacion_idUbicacion`) REFERENCES `objeto` (`idObjeto`, `GrupoObjetos_idGrupoObjetos`, `Ubicacion_idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestado_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
