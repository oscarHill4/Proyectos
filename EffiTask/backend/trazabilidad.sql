-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-11-2024 a las 03:17:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `trazabilidad`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_tiempos`
--

CREATE TABLE `detalles_tiempos` (
  `id_detalle_tiempo` int(11) NOT NULL,
  `id_det_tiem_tiempo` int(10) NOT NULL,
  `tiempo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `detalles_tiempos`
--

INSERT INTO `detalles_tiempos` (`id_detalle_tiempo`, `id_det_tiem_tiempo`, `tiempo`) VALUES
(36, 55, 40721),
(37, 56, 1764042),
(38, 57, 31457836),
(39, 58, 15746),
(40, 59, 38673),
(41, 60, 56654),
(42, 61, 105043),
(43, 62, 31589),
(44, 63, 50693);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `cedula` int(11) NOT NULL,
  `nombre_empleado` varchar(60) NOT NULL,
  `zona` int(11) NOT NULL,
  `cargo` varchar(40) NOT NULL,
  `telefono_empleado` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`cedula`, `nombre_empleado`, `zona`, `cargo`, `telefono_empleado`) VALUES
(1004, 'Emmanuel Quintero', 2, 'Cortador Laser', '3205588963'),
(1005, 'Nicolas Alzate', 2, 'Doblador', '3158997448'),
(1008, 'Alejandro Castrillon', 2, 'Doblador', '3258889999'),
(1009, 'Juan Pescador', 5, 'Pulidor', '320889966');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `usuario` varchar(40) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `contraseña` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`id_login`, `usuario`, `correo`, `contraseña`) VALUES
(1, 'pepe pepito perez perez', 'pepe@gmail.com', '12345'),
(2, 'gilma44', 'gilama@gmail.com', 'gilma44'),
(3, 'Daniel Gil', 'daniel@gmail.com', '123456789'),
(4, 'diego vargas', 'diego.vargas@ciaf.edu.co', 'diego123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre_producto` varchar(40) NOT NULL,
  `observaciones` varchar(50) NOT NULL,
  `fecha_entrada` datetime NOT NULL,
  `fecha_salida` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre_producto`, `observaciones`, `fecha_entrada`, `fecha_salida`) VALUES
(16879, 'Repisa', '', '2024-11-05 18:18:00', '2024-11-29 18:18:00'),
(16889, 'Mesa de ensamble', 'Medidas estandar', '2024-11-03 17:42:00', '2024-11-22 21:42:00'),
(16899, 'Escabiladero', 'No tiene', '2024-11-12 18:25:00', '2024-12-10 18:25:00'),
(16997, 'Carrito auxiliar', '', '2024-11-15 01:05:00', '2024-11-29 01:05:00'),
(16998, 'Mesa de bebidas', 'Medidas estandar', '2024-11-03 17:11:00', '2024-11-30 17:11:00'),
(18796, 'Escabiladero', 'Urgente', '2024-11-05 22:48:00', '2024-11-29 22:48:00'),
(18975, 'Repisa a pared', '', '2024-11-13 18:42:00', '2024-12-04 14:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiempos`
--

CREATE TABLE `tiempos` (
  `id_tiempo` int(10) NOT NULL,
  `id_empleado_tiempo` int(11) NOT NULL,
  `id_producto_tiempo` int(11) NOT NULL,
  `fecha_asignacion` timestamp NOT NULL DEFAULT current_timestamp(),
  `estado` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL DEFAULT 'en_proceso'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `tiempos`
--

INSERT INTO `tiempos` (`id_tiempo`, `id_empleado_tiempo`, `id_producto_tiempo`, `fecha_asignacion`, `estado`) VALUES
(55, 1004, 16879, '2024-11-10 21:03:37', 'finalizado'),
(56, 1008, 16879, '2024-11-10 21:03:42', 'finalizado'),
(57, 1005, 16879, '2024-11-10 21:03:54', 'finalizado'),
(58, 1005, 16889, '2024-11-12 23:22:42', 'finalizado'),
(59, 1004, 16899, '2024-11-12 23:25:57', 'finalizado'),
(60, 1005, 16998, '2024-11-13 03:07:35', 'finalizado'),
(61, 1008, 18975, '2024-11-13 23:43:54', 'finalizado'),
(62, 1004, 16998, '2024-11-14 17:17:38', 'finalizado'),
(63, 1009, 16997, '2024-11-15 06:05:45', 'finalizado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zonas`
--

CREATE TABLE `zonas` (
  `id_zonas` int(11) NOT NULL,
  `nombre_zona` varchar(40) NOT NULL,
  `cantidad_empleados` int(10) NOT NULL,
  `cantidad_puestos` int(10) NOT NULL,
  `area` int(10) NOT NULL,
  `observaciones` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Volcado de datos para la tabla `zonas`
--

INSERT INTO `zonas` (`id_zonas`, `nombre_zona`, `cantidad_empleados`, `cantidad_puestos`, `area`, `observaciones`) VALUES
(1, 'Diseño', 3, 3, 2, 'Las ordenes ingresan aquí primero'),
(2, 'Corte de lamina', 2, 3, 5, 'Primera zona en produccion'),
(3, 'Trazo de lamina', 3, 2, 6, 'Se necesita stock de materia prima'),
(4, 'Soldadura', 6, 8, 12, 'Zona importante en el proceso'),
(5, 'Terminado', 7, 7, 8, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalles_tiempos`
--
ALTER TABLE `detalles_tiempos`
  ADD PRIMARY KEY (`id_detalle_tiempo`),
  ADD KEY `id_det_tiem_tiempo` (`id_det_tiem_tiempo`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`cedula`),
  ADD KEY `zona` (`zona`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `tiempos`
--
ALTER TABLE `tiempos`
  ADD PRIMARY KEY (`id_tiempo`),
  ADD KEY `id_empleado_tiempo` (`id_empleado_tiempo`),
  ADD KEY `id_producto_tiempo` (`id_producto_tiempo`);

--
-- Indices de la tabla `zonas`
--
ALTER TABLE `zonas`
  ADD PRIMARY KEY (`id_zonas`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `detalles_tiempos`
--
ALTER TABLE `detalles_tiempos`
  MODIFY `id_detalle_tiempo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT de la tabla `login`
--
ALTER TABLE `login`
  MODIFY `id_login` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18976;

--
-- AUTO_INCREMENT de la tabla `tiempos`
--
ALTER TABLE `tiempos`
  MODIFY `id_tiempo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `zonas`
--
ALTER TABLE `zonas`
  MODIFY `id_zonas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalles_tiempos`
--
ALTER TABLE `detalles_tiempos`
  ADD CONSTRAINT `detalles_tiempos_ibfk_1` FOREIGN KEY (`id_det_tiem_tiempo`) REFERENCES `tiempos` (`id_tiempo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD CONSTRAINT `empleados_ibfk_1` FOREIGN KEY (`zona`) REFERENCES `zonas` (`id_zonas`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tiempos`
--
ALTER TABLE `tiempos`
  ADD CONSTRAINT `tiempos_ibfk_1` FOREIGN KEY (`id_empleado_tiempo`) REFERENCES `empleados` (`cedula`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `tiempos_ibfk_2` FOREIGN KEY (`id_producto_tiempo`) REFERENCES `productos` (`id_producto`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
