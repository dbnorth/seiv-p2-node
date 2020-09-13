CREATE TABLE `course4`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `dept` CHAR(4) NOT NULL,
  `number` CHAR(10) NOT NULL,
  `level` CHAR(1) NULL,
  `hours` INT NULL,
  `name` VARCHAR(100) NULL,
  `description` VARCHAR(2000) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `course_number_UNIQUE` (`id` ASC) ,
  UNIQUE INDEX `number_UNIQUE` (`number` ASC) );