/*
SQLyog Ultimate v8.55 
MySQL - 5.0.88-community-nt : Database - horizontal
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`horizontal` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `horizontal`;

/*Table structure for table `billing` */

DROP TABLE IF EXISTS `billing`;

CREATE TABLE `billing` (
  `bno` int(11) default NULL,
  `cname` varchar(40) default NULL,
  `dname` varchar(40) default NULL,
  `mno` int(11) NOT NULL,
  `mcname` varchar(100) default NULL,
  `name` varchar(100) default NULL,
  `type` varchar(30) default NULL,
  `used` int(11) default NULL,
  `amount` int(11) default NULL,
  `cno` int(12) default NULL,
  `due` varchar(10) default NULL,
  PRIMARY KEY  (`mno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `billing` */

insert  into `billing`(`bno`,`cname`,`dname`,`mno`,`mcname`,`name`,`type`,`used`,`amount`,`cno`,`due`) values (8,'Y.S.R KADAPA','PULIVENDULA',100,'Y.S JAGAN','Y.S JAGAN','commercial',1200,9600,0,'balance'),(9,'HYDERABAD','K.P.H.B',111,'SANKALPA SOFTWARE SOLUTIONS','P SRINIVASU REDDY','commercial',1100,8800,0,'balance'),(10,'VIZAG','GAJUWAKA',222,'Y.T NAIDU','Y.T NAIDU','commercial',1150,9200,0,'balance'),(1,'VIZIANAGARAM','PARVATHIPURAM',333,'D SANKAR','D SANKAR','residential',120,600,0,'balance'),(2,'VIJAYAWADA','ELURU',444,'K ANIL','K ANIL','residential',110,550,0,'balance'),(3,'GUNTUR','SATTINAPALLY',555,'V.R REDDY','V.R REDDY','residential',130,650,0,'balance'),(4,'SRIKAKULAM','RAJAM',666,'HEMASUNDER','HEMASUNDER','residential',140,700,0,'balance'),(5,'WARANGAL','KHAZIPET',777,'SAVITRI','SAVITRI','residential',150,750,0,'balance'),(6,'KHAMMAM','KAMMAM CENTRAL',888,'GOPI','GOPI','residential',160,800,0,'balance'),(7,'NALGONDA','NALGONDA JN',999,'SRUJAN','SRUJAN','residential',170,850,0,'balance');

/*Table structure for table `circle` */

DROP TABLE IF EXISTS `circle`;

CREATE TABLE `circle` (
  `idno` int(3) NOT NULL,
  `name` varchar(40) default NULL,
  PRIMARY KEY  (`idno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `circle` */

insert  into `circle`(`idno`,`name`) values (1,'HYDERABAD'),(2,'VIZAG'),(3,'VIZIANAGARAM'),(4,'VIJAYAWADA'),(5,'GUNTUR'),(6,'SRIKAKULAM'),(7,'WARANGAL'),(8,'KHAMMAM'),(9,'NALGONDA'),(10,'Y.S.R KADAPA');

/*Table structure for table `consumer` */

DROP TABLE IF EXISTS `consumer`;

CREATE TABLE `consumer` (
  `cname` varchar(40) default NULL,
  `dname` varchar(40) default NULL,
  `mno` int(11) NOT NULL,
  `mcname` varchar(100) default NULL,
  `name` varchar(100) default NULL,
  `age` int(2) default NULL,
  `sex` varchar(10) default NULL,
  `cno` int(11) default NULL,
  `address` varchar(200) default NULL,
  `type` varchar(15) default NULL,
  `uname` varchar(30) default NULL,
  `pass` varchar(30) default NULL,
  PRIMARY KEY  (`mno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `consumer` */

insert  into `consumer`(`cname`,`dname`,`mno`,`mcname`,`name`,`age`,`sex`,`cno`,`address`,`type`,`uname`,`pass`) values ('Y.S.R KADAPA','PULIVENDULA',100,'Y.S JAGAN','Y.S JAGAN',24,'male',998877665,'KHADAPA','commercial','jagan','jagan'),('HYDERABAD','K.P.H.B',111,'SANKALPA SOFTWARE SOLUTIONS','P SRINIVASU REDDY',45,'male',924779194,'AMEERPET','commercial','psr','psr'),('VIZAG','GAJUWAKA',222,'Y.T NAIDU','Y.T NAIDU',40,'male',986613866,'OLD GAJUWAKA','commercial','ytnaidu','ytnaidu'),('VIZIANAGARAM','PARVATHIPURAM',333,'D SANKAR','D SANKAR',25,'male',998942510,'KOTTURU','residential','sankar','sankar'),('VIJAYAWADA','ELURU',444,'K ANIL','K ANIL',24,'male',987654321,'PARVATHIPURAM','residential','anil','anil'),('GUNTUR','SATTINAPALLY',555,'V.R REDDY','V.R REDDY',27,'male',987654321,'PARIGI','residential','reddy','reddy'),('SRIKAKULAM','RAJAM',666,'HEMASUNDER','HEMASUNDER',25,'male',987654321,'PALASA','residential','hema','hema'),('WARANGAL','KHAZIPET',777,'SAVITRI','SAVITRI',23,'male',987654321,'RAIKAL','residential','savirti','savitri'),('KHAMMAM','KAMMAM CENTRAL',888,'GOPI','GOPI',23,'male',987654323,'KHAMMAM','residential','gopi','gopi'),('NALGONDA','NALGONDA JN',999,'SRUJAN','SRUJAN',23,'male',889977332,'NALGONDA','residential','srujan','srujan');

/*Table structure for table `division` */

DROP TABLE IF EXISTS `division`;

CREATE TABLE `division` (
  `didno` int(3) NOT NULL,
  `cname` varchar(40) default NULL,
  `dname` varchar(40) default NULL,
  PRIMARY KEY  (`didno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `division` */

insert  into `division`(`didno`,`cname`,`dname`) values (1,'HYDERABAD','K.P.H.B'),(2,'VIZAG','GAJUWAKA'),(3,'VIZIANAGARAM','PARVATHIPURAM'),(4,'VIJAYAWADA','ELURU'),(5,'GUNTUR','SATTINAPALLY'),(6,'SRIKAKULAM','RAJAM'),(7,'WARANGAL','KHAZIPET'),(8,'KHAMMAM','KAMMAM CENTRAL'),(9,'NALGONDA','NALGONDA JN'),(10,'Y.S.R KADAPA','PULIVENDULA');

/*Table structure for table `logindetails` */

DROP TABLE IF EXISTS `logindetails`;

CREATE TABLE `logindetails` (
  `uname` varchar(50) default NULL,
  `password` varchar(20) default NULL,
  `utype` varchar(80) default NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `logindetails` */

insert  into `logindetails`(`uname`,`password`,`utype`) values ('admin','admin','admin');

/*Table structure for table `meter` */

DROP TABLE IF EXISTS `meter`;

CREATE TABLE `meter` (
  `cname` varchar(40) default NULL,
  `dname` varchar(40) default NULL,
  `mno` int(11) NOT NULL,
  `mcname` varchar(100) default NULL,
  PRIMARY KEY  (`mno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `meter` */

insert  into `meter`(`cname`,`dname`,`mno`,`mcname`) values ('Y.S.R KADAPA','PULIVENDULA',100,'Y.S JAGAN'),('HYDERABAD','K.P.H.B',111,'SANKALPA SOFTWARE SOLUTIONS'),('VIZAG','GAJUWAKA',222,'Y.T NAIDU'),('VIZIANAGARAM','PARVATHIPURAM',333,'D SANKAR'),('VIJAYAWADA','ELURU',444,'K ANIL'),('GUNTUR','SATTINAPALLY',555,'V.R REDDY'),('SRIKAKULAM','RAJAM',666,'HEMASUNDER'),('WARANGAL','KHAZIPET',777,'SAVITRI'),('KHAMMAM','KAMMAM CENTRAL',888,'GOPI'),('NALGONDA','NALGONDA JN',999,'SRUJAN');

/*Table structure for table `query` */

DROP TABLE IF EXISTS `query`;

CREATE TABLE `query` (
  `cname` varchar(40) default NULL,
  `dname` varchar(40) default NULL,
  `mno` int(11) NOT NULL,
  `mcname` varchar(100) default NULL,
  `name` varchar(100) default NULL,
  `query` varchar(500) default NULL,
  PRIMARY KEY  (`mno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `query` */

insert  into `query`(`cname`,`dname`,`mno`,`mcname`,`name`,`query`) values ('VIZIANAGARAM','PARVATHIPURAM',333,'D SANKAR','D SANKAR','This application is a horizontal aggregation');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
