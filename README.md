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
* Crear usuario<br>
<b>recurso /login</b><br>
	desde el frontend seleccionar la opcion registrarse <br>
	<img src="images/registrate.png" width="300" height="300"  style="float: left;"/><br>
	completar el formulario <br>
	<img src="images/register-form.png"  width="350" height="600"/><br>

* Obtener el client id de tu usuario
```
curl -X POST http://localhost:3000/client/auth -H 'Content-Type: application/json' -D '{"username":"lautarin","password":"1337"}'
```

response 
```
{
    "_id": "5bd99cb677a9412434bbd2f1",
    "name": "Lautarin"
}
```

---
### ABM empleados


---
### Carga de novedades


---
### Liquidacion de sueldo


---
### Facturacion de servicios
