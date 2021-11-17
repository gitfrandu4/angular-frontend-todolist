# Angular Frontend Todo list

Repasando Angular

## CORS policy

```
Access to fetch at 'http://localhost:5001/api/todos' from origin 'http://localhost:4200' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
```

**Intercambio de Recursos de Origen Cruzado (CORS)** es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador. Si los recursos de la API REST reciben solicitudes HTTP complejas de varios orígenes, debe habilitar la compatibilidad con CORS.

Más info: https://docs.aws.amazon.com/es_es/apigateway/latest/developerguide/how-to-cors.html

En resumen, las APIs por defecto se protegen para que nadie pueda hacerle una petición desde un dominio (subdominio, **puerto** o protocolo) diferente al utilizado por la propia API. 

![CORS](https://mdn.mozillademos.org/files/14295/CORS_principle.png)
