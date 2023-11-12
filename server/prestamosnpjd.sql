-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2023 a las 00:06:54
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prestamosnpjd`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `listUsuarios` ()   BEGIN
   SELECT * from usuario;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_cliente` (IN `id_cliente` INT)   BEGIN
    UPDATE cliente SET fecha_baja = NOW() WHERE id = id_cliente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spd_prestamo` (IN `idC` INT)   BEGIN
    UPDATE prestamo SET fecha_baja = NOW() WHERE id = idC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_cliente` (IN `nombre` VARCHAR(60), IN `apellido` VARCHAR(60), IN `dni` VARCHAR(11), IN `direccion` VARCHAR(60))   BEGIN
    INSERT INTO cliente (nombre, apellido, dni, direccion)
    VALUES (nombre, apellido, dni, direccion);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_cuota_pagada` (IN `id_prestamoC` INT, IN `cuotaC` DOUBLE)   BEGIN
    INSERT INTO cuotas_pagadas (id_prestamo, cuota) VALUES (id_prestamoC, cuotaC);

    SET @saldoT = (SELECT saldo FROM saldo_prestamo WHERE id_prestamo = id_prestamoC);

    IF EXISTS (SELECT 1 FROM saldo_prestamo WHERE id_prestamo = id_prestamoC) THEN
        SET @total = @saldoT - cuotaC;
        UPDATE saldo_prestamo SET saldo = @total WHERE id_prestamo = id_prestamoC;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spi_prestamo` (IN `cliente_id` INT, IN `valor_prestamo` DOUBLE)   BEGIN
    -- Insertar el préstamo en la tabla de préstamos
    INSERT INTO prestamo (id_cliente, cantidad_prestada) VALUES (cliente_id, valor_prestamo);
    
    -- Obtener el último ID insertado en la tabla de préstamos
    SELECT LAST_INSERT_ID() INTO @ultimo_id;

    -- Verificar si el ID de préstamo existe en la tabla de saldo
    IF NOT EXISTS (SELECT * FROM saldo_prestamo WHERE id_prestamo = @ultimo_id) THEN
        -- Insertar en la tabla de saldo si no existe
        INSERT INTO saldo_prestamo (id_prestamo, saldo) VALUES (@ultimo_id, valor_prestamo);
    END IF;
    
    -- Retornar el último ID insertado
    SELECT @ultimo_id AS ultimo_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_cliente` ()   BEGIN
   SELECT * from cliente where fecha_baja IS null;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_cuota_pagada` (IN `id_prestamo` INT)   BEGIN
    SELECT * from cuotas_pagadas WHERE id_prestamo = id_prestamo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_prestamo` ()   BEGIN
    SELECT * from prestamo WHERE fecha_baja is null;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_saldo_prestamo` ()   BEGIN
   SELECT * FROM saldo_prestamo;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_un_cliente` (IN `idC` INT)   BEGIN
    SELECT * FROM cliente WHERE id = idC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_un_prestamo` (IN `idC` INT)   BEGIN
    SELECT * FROM prestamo WHERE id = idC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sps_un_saldo` (IN `id_prestamoC` INT)   BEGIN
   SELECT * FROM saldo_prestamo WHERE id_prestamo = id_prestamoC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_cliente` (IN `idC` INT, IN `nombreC` VARCHAR(60), IN `apellidoC` VARCHAR(60), IN `dniC` VARCHAR(11), IN `direccionC` VARCHAR(60))   BEGIN
    UPDATE cliente SET nombre = nombreC, apellido = apellidoC, dni = dniC, direccion = direccionC WHERE id = idC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_cuota_pagada` (IN `idC` INT, IN `cuotaC` DOUBLE)   BEGIN
  
    UPDATE cuotas_pagadas SET  cuota = cuotaC WHERE id = idC;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_prestamo` (IN `idP` INT, IN `prestamoC` DOUBLE)   BEGIN
     UPDATE prestamo SET  cantidad_prestada = prestamoC WHERE id = idP;
     
     -- Verificar si el ID de préstamo existe en la tabla de saldo
    IF EXISTS (SELECT * FROM saldo_prestamo WHERE id_prestamo = idP) THEN
        -- EDITO en la tabla de saldo existente del prestamo
        UPDATE saldo_prestamo SET saldo = prestamoC WHERE id_prestamo = idP;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `spu_saldo_prestamo` (IN `id_prestamoC` INT, IN `saldo` DOUBLE)   BEGIN
   UPDATE saldo_prestamo SET saldo = saldo WHERE id_prestamo = id_prestamoC;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `apellido` varchar(60) NOT NULL,
  `dni` varchar(11) NOT NULL,
  `direccion` varchar(60) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `fecha_baja` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `nombre`, `apellido`, `dni`, `direccion`, `createdAt`, `updatedAt`, `fecha_baja`) VALUES
(1, 'Daniela', 'Londoño', '95364141', 'milan 532', '2023-06-05 16:24:02', NULL, NULL),
(2, 'pepito', 'perez', '99999999', 'lanus 1123', '2023-06-08 15:51:06', NULL, '2023-06-08 16:26:26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuotas_pagadas`
--

CREATE TABLE `cuotas_pagadas` (
  `id` int(11) NOT NULL,
  `id_prestamo` int(11) NOT NULL,
  `cuota` double NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `cuotas_pagadas`
--

INSERT INTO `cuotas_pagadas` (`id`, `id_prestamo`, `cuota`, `createdAt`, `updatedAt`) VALUES
(1, 1, 4000, '2023-06-08 20:41:01', NULL),
(2, 1, 2000, '2023-06-08 20:57:47', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo`
--

CREATE TABLE `prestamo` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `cantidad_prestada` double NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` date DEFAULT NULL,
  `fecha_baja` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `prestamo`
--

INSERT INTO `prestamo` (`id`, `id_cliente`, `cantidad_prestada`, `createdAt`, `updatedAt`, `fecha_baja`) VALUES
(1, 1, 60000, '2023-06-08 18:12:39', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saldo_prestamo`
--

CREATE TABLE `saldo_prestamo` (
  `id` int(11) NOT NULL,
  `id_prestamo` int(11) NOT NULL,
  `saldo` double NOT NULL,
  `fecha_modi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `saldo_prestamo`
--

INSERT INTO `saldo_prestamo` (`id`, `id_prestamo`, `saldo`, `fecha_modi`) VALUES
(1, 1, 54000, '2023-06-08 18:12:39');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `mail` varchar(50) DEFAULT NULL,
  `clave` varchar(50) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `updatedAt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `mail`, `clave`, `createdAt`, `updatedAt`) VALUES
(1, 'danii_9997@hotmail.com', 'hajgdhgdjhgs', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cuotas_pagadas`
--
ALTER TABLE `cuotas_pagadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_prestamo` (`id_prestamo`);

--
-- Indices de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `saldo_prestamo`
--
ALTER TABLE `saldo_prestamo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_prestamo` (`id_prestamo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cuotas_pagadas`
--
ALTER TABLE `cuotas_pagadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `prestamo`
--
ALTER TABLE `prestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `saldo_prestamo`
--
ALTER TABLE `saldo_prestamo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cuotas_pagadas`
--
ALTER TABLE `cuotas_pagadas`
  ADD CONSTRAINT `id_prestamo` FOREIGN KEY (`id_prestamo`) REFERENCES `prestamo` (`id`);

--
-- Filtros para la tabla `prestamo`
--
ALTER TABLE `prestamo`
  ADD CONSTRAINT `id_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
