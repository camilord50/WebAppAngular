# SalesPredictionApp - Web App

La aplicacion Web App fue desarrollada utilizando el framework Angular
y se requieren las siguientes versiones:

-Angular CLI: 17.3.17
-Node: 18.20.0
-Package Manager: npm 10.5.0

se ejecuta el comando para instalar dependencias necesarias:

npm install

para la configuracion de la URL de la API se ubica el archivo "proxy.conf.json" y se modifica 
el valor de target de acuerdo al puerto que utilice la API durante su despliegue y se ejecuta 
el siguiente comando en la consola para iniciar la aplicacion:

ng serve --proxy-config proxy.conf.json

# SalesDatePrediction - API

el archivo llamado "SalesDatePrediction.rar" contiene la solucion de la api llamada "SalesDatePrediction" la cual aplica una separación en capas y principios SOLID, 
se debe utilizar un IDE Visual Studio 2022 (o superior) y carga de trabajo "Desarrollo para ASP.NET y web” (ASP.NET and web development)

String de conexion
para configurar la cadena de conexion de la API se debe ubicar el archivo "appsettings.json" en la solucion SalesDatePrediction.Api y se actualiza "DefaultConnection" de acuerdo a las credenciales que tenga definidas en el equipo en SQLServer

la API se encuentra estructurado de la siguiente manera.

01.Presentacion
Proyecto: ASP.NET Core Web API
Nombre: SalesDatePrediction.Api
Framework: .NET 8.0
Aquí van los Controllers.

02.Servicio
Proyecto: Biblioteca de clases (.NET 8.0)
Nombre: SalesDatePrediction.Servicio
Aquí van los DTOs, Repositorio, Servicios.

03.DataAccess
Proyecto: Biblioteca de clases (.NET 8.0)
Nombre: SalesDatePrediction.Dominio
Aquí van los Models.

04.Pruebas
Proyecto: xUnit Test Project (.NET 8.0)
Nombre: SalesDatePrediction.Tests
Aquí las pruebas unitarias.


# Graficando con D3

el archivo "Grafica D3.rar" contiene el archivo index.html el cual tiene el codigo siguiendo las instrucciones del punto.


# QUERY SQL - BASE DE DATOS

el archivo QUERYSQL.txt contiene las sentencias DML necesarias y utilizadas para el desarrollo de la prueba tecnica



