<b>uade integracion de aplicaciones</b>
# Sistema de liquidacion de sueldo

<b>indice</b>
* [ABM de clientes](#ABM_clientes)
* [ABM de empleados y asociacion con clientes](#ABM_empleados). Los tipos posibles de empleados son:
	* Empleados con sueldo por hora
	* Empleados con sueldo por mes
* [Carga de novedades de empleados](#Carga_novedades). Las novedades son:
	* Para empleados por hora, se carga novedad de horas trabajadas
	* Para empleados por mes, se carga novedad de vacaciones (se resta de su salario)
* [Liquidacion de sueldo de empleado](#liquidacion-de-sueldo).
	* Para empleados por hora, se multiplica horas trabajadas (cargadas en novedades) por suelo por hora
	* Para empleados por mes, el salario base menos 1/30 de salario por cada dia de vacaciones (cargadas en novedades) 
* [Facturacion de servicios brindados](#Facturacion_servicios)


<a name="ABM_clientes"></a>
### ABM clientes
<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
<a name="ABM_empleados"></a>
### ABM empleados

<a name="Carga_novedades"></a>
### Carga de novedades

<a name="Liquidacion_sueldo"></a>
### Liquidacion de sueldo

<a name="Facturacion_servicios"></a>
### Facturacion de servicios
