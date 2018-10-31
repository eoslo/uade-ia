 [link](#test)
<br><br><br>

# uade-ia

## Descripcion del proyecto

Este es un sistema de liquidacion de sueldos. Dara la posibilidad de:
* ABM de clientes
* ABM de empleados y asociacion con clientes. Los tipos posibles de empleados son:
	* Empleados con sueldo por hora
	* Empleados con sueldo por mes
* Carga de novedades de empleados. Las novedades son:
	* Para empleados por hora, se carga novedad de horas trabajadas
	* Para empleados por mes, se carga novedad de vacaciones (se resta de su salario)
* Liquidacion de sueldo de empleado.
	* Para empleados por hora, se multiplica horas trabajadas (cargadas en novedades) por suelo por hora
	* Para empleados por mes, el salario base menos 1/30 de salario por cada dia de vacaciones (cargadas en novedades) 
* Facturacion de servicios brindados

<br><br><br><br><br><br><br><br><br><br><br>
<a name="test></a>
