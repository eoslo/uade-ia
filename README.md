### uade integracion de aplicaciones
# Sistema de liquidacion de sueldo

## indice
* [ABM de clientes]
* [ABM de empleados y asociacion con clientes]. Los tipos posibles de empleados son:
	* Empleados con sueldo por hora
	* Empleados con sueldo por mes
* [Carga de novedades de empleados]. Las novedades son:
	* Para empleados por hora, se carga novedad de horas trabajadas
	* Para empleados por mes, se carga novedad de vacaciones (se resta de su salario)
* [Liquidacion de sueldo de empleado].
	* Para empleados por hora, se multiplica horas trabajadas (cargadas en novedades) por suelo por hora
	* Para empleados por mes, el salario base menos 1/30 de salario por cada dia de vacaciones (cargadas en novedades) 
* [Facturacion de servicios brindados]


<a name="ABM clientes"></a>
### ABM clientes

<a name="ABM empleados"></a>
### ABM empleados

<a name="Carga de novedades"></a>
### Carga de novedades

<a name="Liquidacion de sueldo"></a>
### Liquidacion de sueldo

<a name="Facturacion de servicios"></a>
### Facturacion de servicios
