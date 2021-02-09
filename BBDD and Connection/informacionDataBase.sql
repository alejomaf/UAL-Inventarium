-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2021 a las 10:29:42
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

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
(4, '192.168.42.2', 'AA:BB:CC:DD:EE', '4A', '3', 'administrador', 'admin', 865);

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
  `tipo` tinyint(4) DEFAULT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `grupoobjetos`
--

INSERT INTO `grupoobjetos` (`idGrupoObjetos`, `cantidad`, `nombre`, `imagen`, `marca`, `modelo`, `cantidadDisponible`, `tipo`, `eliminado`) VALUES
(187, 9, 'Impresora', '../../images/objects/1608466913.jpg', 'Canon', 'H5', 6, 0, 0),
(188, 10, 'Kit de Raspberry', '../../images/objects/1609764130.jpg', 'Raspberry', 'Pi 3', 10, 2, 0),
(189, 0, 'Dólares Blue', '../../images/objects/1609776460.jpg', 'Estados Unidos', '100 dólares', 0, 1, 0),
(190, 0, 'Peso cubano', '../../images/objects/1609776685.jpg', 'Cuba', 'Peso cubano', 0, 1, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `kit`
--

CREATE TABLE `kit` (
  `idKit` int(11) NOT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL,
  `Ubicacion_idUbicacion` int(11) DEFAULT NULL,
  `disponible` tinyint(4) NOT NULL DEFAULT 0,
  `eliminado` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `kit`
--

INSERT INTO `kit` (`idKit`, `GrupoObjetos_idGrupoObjetos`, `Ubicacion_idUbicacion`, `disponible`, `eliminado`) VALUES
(4, 188, 6, 0, 0),
(5, 188, 6, 0, 0),
(6, 188, 6, 0, 0),
(7, 188, 6, 0, 0),
(8, 188, 6, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objeto`
--

CREATE TABLE `objeto` (
  `idObjeto` int(11) NOT NULL,
  `mejorasEquipo` varchar(45) DEFAULT NULL,
  `codigo` int(11) DEFAULT -1,
  `disponible` tinyint(4) DEFAULT 0,
  `eliminado` tinyint(4) DEFAULT 0,
  `fechaAdquisicion` date DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `organizativa` int(11) DEFAULT 0,
  `etiqueta` varchar(45) DEFAULT NULL,
  `Ubicacion_idUbicacion` int(11) DEFAULT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `objeto`
--

INSERT INTO `objeto` (`idObjeto`, `mejorasEquipo`, `codigo`, `disponible`, `eliminado`, `fechaAdquisicion`, `observaciones`, `organizativa`, `etiqueta`, `Ubicacion_idUbicacion`, `GrupoObjetos_idGrupoObjetos`) VALUES
(865, NULL, 691692, 1, 0, '2014-10-29', NULL, 1, '\"Hello\"', 6, 187),
(866, 'Imprime algo mal', 2147483647, 1, 0, NULL, 'ISBN: 123123213', 0, 'Imp6', 6, 187),
(867, 'Imprime de forma interesante', 12312312, 0, 0, NULL, 'ISBN: 123912480213', 0, 'Imp7', 6, 187),
(868, 'Buen equipo', 324123123, 1, 0, '2020-12-20', 'Roto', 0, 'Imp9', 6, 187);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `objetokit`
--

CREATE TABLE `objetokit` (
  `idObjetoKit` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `imagen` varchar(45) DEFAULT NULL,
  `observaciones` varchar(45) DEFAULT NULL,
  `GrupoObjetos_idGrupoObjetos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `Objeto_GrupoObjetos_idGrupoObjetos` int(11) DEFAULT NULL,
  `Objeto_Ubicacion_idUbicacion` int(11) NOT NULL,
  `solicitado` date DEFAULT NULL,
  `estado` tinyint(4) DEFAULT NULL,
  `Kit_idKit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `prestado`
--

INSERT INTO `prestado` (`idPrestado`, `retiradoPor`, `fechaSalida`, `fechaEntrega`, `fechaEstimadaEntrega`, `Usuario_idUsuario`, `Objeto_idObjeto`, `Objeto_GrupoObjetos_idGrupoObjetos`, `Objeto_Ubicacion_idUbicacion`, `solicitado`, `estado`, `Kit_idKit`) VALUES
(2, 'Alejo', '2021-01-02', '2021-01-02', '2020-12-19', 3, 865, 187, 6, '2020-12-20', 1, NULL),
(3, 'Alejo Arias', '2021-01-02', '0000-00-00', '2021-01-13', 3, 866, 187, 6, '2021-01-02', 0, NULL),
(4, 'Francisco Amate', '0000-00-00', '0000-00-00', '2021-01-28', 3, 867, 187, 6, '2021-01-02', -1, NULL),
(5, 'Carlos Ruiz', '0000-00-00', '0000-00-00', '2021-01-22', 3, 866, 187, 6, '2021-01-02', -1, NULL),
(6, 'Alfonsito', '2021-01-02', '0000-00-00', '2020-12-29', 2, 868, 187, 6, '2021-01-02', 0, NULL),
(7, 'Carlos Daniel', '2021-01-04', '0000-00-00', '2020-12-28', 3, 865, 187, 6, '2021-01-04', 0, NULL);

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
(6, 'Despacho 1.13', 'Planta 1', 'CITE I');

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
(2, 'Alejo Martín Arias Filippo', 'admin', 'ualinventarium@gmail.com', 0, 0, 674915779),
(3, 'Juan Francisco Sanjuan Estrada', 'juan', 'jsanjuan@gmail.com', 1, 0, 666666666);

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
-- Indices de la tabla `kit`
--
ALTER TABLE `kit`
  ADD PRIMARY KEY (`idKit`,`GrupoObjetos_idGrupoObjetos`),
  ADD KEY `fk_Kit_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`),
  ADD KEY `fk_Kit_Ubicacion1_idx` (`Ubicacion_idUbicacion`);

--
-- Indices de la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD PRIMARY KEY (`idObjeto`,`GrupoObjetos_idGrupoObjetos`),
  ADD KEY `fk_Objeto_Ubicacion1_idx` (`Ubicacion_idUbicacion`),
  ADD KEY `fk_Objeto_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`);

--
-- Indices de la tabla `objetokit`
--
ALTER TABLE `objetokit`
  ADD PRIMARY KEY (`idObjetoKit`),
  ADD KEY `fk_ObjetoKit_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos`);

--
-- Indices de la tabla `prestado`
--
ALTER TABLE `prestado`
  ADD PRIMARY KEY (`idPrestado`,`Usuario_idUsuario`),
  ADD KEY `fk_Prestado_Usuario1_idx` (`Usuario_idUsuario`),
  ADD KEY `fk_Prestado_Objeto1_idx` (`Objeto_idObjeto`,`Objeto_GrupoObjetos_idGrupoObjetos`,`Objeto_Ubicacion_idUbicacion`),
  ADD KEY `fk_Prestado_Kit1_idx` (`Kit_idKit`);

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
  MODIFY `idConfiguracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `grupoobjetos`
--
ALTER TABLE `grupoobjetos`
  MODIFY `idGrupoObjetos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=191;

--
-- AUTO_INCREMENT de la tabla `kit`
--
ALTER TABLE `kit`
  MODIFY `idKit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `objeto`
--
ALTER TABLE `objeto`
  MODIFY `idObjeto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=869;

--
-- AUTO_INCREMENT de la tabla `objetokit`
--
ALTER TABLE `objetokit`
  MODIFY `idObjetoKit` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prestado`
--
ALTER TABLE `prestado`
  MODIFY `idPrestado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `idUbicacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `fk_Configuracion_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `kit`
--
ALTER TABLE `kit`
  ADD CONSTRAINT `fk_Kit_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Kit_Ubicacion1` FOREIGN KEY (`Ubicacion_idUbicacion`) REFERENCES `ubicacion` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `objeto`
--
ALTER TABLE `objeto`
  ADD CONSTRAINT `fk_Objeto_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Objeto_Ubicacion1` FOREIGN KEY (`Ubicacion_idUbicacion`) REFERENCES `ubicacion` (`idUbicacion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `objetokit`
--
ALTER TABLE `objetokit`
  ADD CONSTRAINT `fk_ObjetoKit_GrupoObjetos1` FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`) REFERENCES `grupoobjetos` (`idGrupoObjetos`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `prestado`
--
ALTER TABLE `prestado`
  ADD CONSTRAINT `fk_Prestado_Kit1` FOREIGN KEY (`Kit_idKit`) REFERENCES `kit` (`idKit`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestado_Objeto1` FOREIGN KEY (`Objeto_idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Prestado_Usuario1` FOREIGN KEY (`Usuario_idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
