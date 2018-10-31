<b>uade integracion de aplicaciones</b>
# Sistema de liquidacion de sueldo

<b>indice</b>
* [ABM de clientes](#abm-clientes)
* [ABM de empleados y asociacion con clientes](#abm-empleados). Los tipos posibles de empleados son:
	* Empleados con sueldo por hora
	* Empleados con sueldo por mes
* [Carga de novedades de empleados](#carga-de-novedades). Las novedades son:
	* Para empleados por hora, se carga novedad de horas trabajadas
	* Para empleados por mes, se carga novedad de vacaciones (se resta de su salario)
* [Liquidacion de sueldo de empleado](#liquidacion-de-sueldo).
	* Para empleados por hora, se multiplica horas trabajadas (cargadas en novedades) por suelo por hora
	* Para empleados por mes, el salario base menos 1/30 de salario por cada dia de vacaciones (cargadas en novedades) 
* [Facturacion de servicios brindados](#facturacion-de-servicios)

---
### ABM clientes
* Crear usuario
recurso /login
<img src="images/registrate.png" style="height:15px ; width:15px" />

completar el formulario 
<img src="images/register-form.png.png" style="height:15px ; width:15px" />

desde el frontend seleccionar la opcion registrarse
---
### ABM empleados


---
### Carga de novedades


---
### Liquidacion de sueldo


---
### Facturacion de servicios
