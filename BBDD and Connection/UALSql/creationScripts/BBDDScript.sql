-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema UALInventarium
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema UALInventarium
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `UALInventarium` DEFAULT CHARACTER SET utf8 ;
USE `UALInventarium` ;

-- -----------------------------------------------------
-- Table `UALInventarium`.`GrupoObjetos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`GrupoObjetos` (
  `idGrupoObjetos` INT NOT NULL AUTO_INCREMENT,
  `cantidad` INT NULL,
  `nombre` VARCHAR(45) NULL,
  `imagen` VARCHAR(45) NULL,
  `marca` VARCHAR(45) NULL,
  `modelo` VARCHAR(45) NULL,
  `cantidadDisponible` INT NULL,
  PRIMARY KEY (`idGrupoObjetos`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UALInventarium`.`Ubicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`Ubicacion` (
  `idUbicacion` INT NOT NULL AUTO_INCREMENT,
  `ubicacion` VARCHAR(45) NOT NULL,
  `planta` VARCHAR(45) NOT NULL,
  `edificio` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idUbicacion`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UALInventarium`.`Objeto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`Objeto` (
  `idObjeto` INT NOT NULL AUTO_INCREMENT,
  `mejorasEquipo` VARCHAR(45) NULL,
  `codigo` INT NULL,
  `GrupoObjetos_idGrupoObjetos` INT NOT NULL,
  `Ubicacion_idUbicacion` INT NOT NULL,
  `disponible` TINYINT NOT NULL,
  `elminado` TINYINT NULL,
  PRIMARY KEY (`idObjeto`, `GrupoObjetos_idGrupoObjetos`, `Ubicacion_idUbicacion`),
  INDEX `fk_Objeto_GrupoObjetos1_idx` (`GrupoObjetos_idGrupoObjetos` ASC),
  INDEX `fk_Objeto_Ubicacion1_idx` (`Ubicacion_idUbicacion` ASC),
  CONSTRAINT `fk_Objeto_GrupoObjetos1`
    FOREIGN KEY (`GrupoObjetos_idGrupoObjetos`)
    REFERENCES `UALInventarium`.`GrupoObjetos` (`idGrupoObjetos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Objeto_Ubicacion1`
    FOREIGN KEY (`Ubicacion_idUbicacion`)
    REFERENCES `UALInventarium`.`Ubicacion` (`idUbicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UALInventarium`.`Configuracion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`Configuracion` (
  `idConfiguracion` INT NOT NULL AUTO_INCREMENT,
  `ip` VARCHAR(45) NULL,
  `mac` VARCHAR(45) NULL,
  `boca` VARCHAR(45) NULL,
  `armario` VARCHAR(45) NULL,
  `usuario` VARCHAR(45) NULL,
  `contrasena` VARCHAR(45) NULL,
  `Objeto_idObjeto` INT NOT NULL,
  PRIMARY KEY (`idConfiguracion`),
  INDEX `fk_Configuracion_Objeto1_idx` (`Objeto_idObjeto` ASC),
  CONSTRAINT `fk_Configuracion_Objeto1`
    FOREIGN KEY (`Objeto_idObjeto`)
    REFERENCES `UALInventarium`.`Objeto` (`idObjeto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UALInventarium`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `contrasena` VARCHAR(45) NULL,
  `correoElectronico` VARCHAR(45) NULL,
  `rango` INT(1) NULL,
  `departamento` INT(1) NULL,
  `telefono` INT(1) NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `UALInventarium`.`Prestado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `UALInventarium`.`Prestado` (
  `idPrestado` INT NOT NULL AUTO_INCREMENT,
  `retiradoPor` VARCHAR(45) NULL,
  `fechaSalida` DATE NULL,
  `fechaEntrega` DATE NULL,
  `fechaEstimadaEntrega` DATE NULL,
  `Usuario_idUsuario` INT NOT NULL COMMENT 'Enviado por\n',
  `Objeto_idObjeto` INT NOT NULL,
  `Objeto_GrupoObjetos_idGrupoObjetos` INT NOT NULL,
  `Objeto_Ubicacion_idUbicacion` INT NOT NULL,
  PRIMARY KEY (`idPrestado`, `Usuario_idUsuario`),
  INDEX `fk_Prestado_Usuario1_idx` (`Usuario_idUsuario` ASC),
  INDEX `fk_Prestado_Objeto1_idx` (`Objeto_idObjeto` ASC, `Objeto_GrupoObjetos_idGrupoObjetos` ASC, `Objeto_Ubicacion_idUbicacion` ASC),
  CONSTRAINT `fk_Prestado_Usuario1`
    FOREIGN KEY (`Usuario_idUsuario`)
    REFERENCES `UALInventarium`.`Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Prestado_Objeto1`
    FOREIGN KEY (`Objeto_idObjeto` , `Objeto_GrupoObjetos_idGrupoObjetos` , `Objeto_Ubicacion_idUbicacion`)
    REFERENCES `UALInventarium`.`Objeto` (`idObjeto` , `GrupoObjetos_idGrupoObjetos` , `Ubicacion_idUbicacion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
