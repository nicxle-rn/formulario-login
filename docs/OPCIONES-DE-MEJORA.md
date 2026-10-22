# Opciones de mejora y corrección para el registro

## Para qué sirve este documento

Este archivo describe aspectos que se podrían mejorar o corregir en el registro de Lumina. **No se aplicó ninguna de esas mejoras**: la lógica de `script.js` se conserva tal como estaba. La única conexión nueva hecha en el HTML es el atributo `onclick` del botón de registro.

La idea es que puedas leer cada punto, entender qué ocurre actualmente y decidir en otro momento si quieres cambiarlo. Varias opciones requieren tomar decisiones sobre cómo debería funcionar el proyecto; por eso aquí se explican, pero no se da por sentado que deban implementarse.

## Cómo quedó conectado el código

- En `index.html`, el botón «Crear cuenta» invoca `registrarUsuario(event)` por medio de `onclick`. El formulario conserva su atributo `onsubmit`, que permite que el envío con la tecla Enter siga pasando por la misma función. Al hacer clic, la función llama `event.preventDefault()`, que cancela la acción de envío normal del botón y evita ejecutar el registro dos veces.
- En `bienvenida.html`, el botón «Cerrar sesión» ya tenía `onclick="logout()"`, y la página ya carga `script.js`. No fue necesario cambiar esa conexión.
- `script.js` no se modificó.
- Durante la revisión inicial también se encontró `rediseño-pantallas.html`, pero al comenzar la implementación ese archivo ya no estaba en la carpeta del repositorio. No se recreó ni se modificó. Si vuelve a incorporarse, habrá que revisar sus controles antes de conectar el registro: los campos de esa maqueta no coincidían con los identificadores que consulta `script.js`.

## Opciones para revisar más adelante

### 1. Decidir cómo se debe comprobar si el correo ya está registrado

**Qué ocurre ahora:** `registrarUsuario` hace una petición `fetch` a `https://jsonplaceholder.typicode.com/users` y compara el correo escrito con los correos de la respuesta. Esa URL es un servicio de ejemplo; no es la base de datos de Lumina ni guarda las nuevas cuentas de este proyecto.

**Por qué conviene revisarlo:** el resultado no representa necesariamente las cuentas creadas por usuarios de Lumina. Aunque el formulario termine redirigiendo a la bienvenida, eso no significa que se haya creado una cuenta en un servidor.

**Posible decisión:** si este es un ejercicio de práctica, se puede conservar el servicio de ejemplo y explicar que los datos son simulados. Si el objetivo es registrar cuentas de verdad, primero habría que definir un servidor y una base de datos apropiados. Cambiar a un sistema real implicaría diseñar y probar otra integración, no solo cambiar el HTML.

### 2. Aprovechar o dejar de solicitar el nombre

**Qué ocurre ahora:** el formulario pide un nombre y la función lee el valor en la variable `name`, pero el programa no lo guarda en `localStorage` ni lo envía a un servidor. Solo conserva el correo.

**Por qué conviene revisarlo:** la persona puede pensar que su nombre formará parte de la cuenta, pero ese dato se descarta al terminar la ejecución de la función.

**Posible decisión:** si se quiere mostrar o conservar el nombre, decidir dónde y por cuánto tiempo guardarlo, y actualizar la pantalla de bienvenida para usarlo. Si no hace falta, se podría evaluar retirar ese campo. Ninguna de esas alternativas se aplicó.

### 3. Manejar los errores de la petición

**Qué ocurre ahora:** el código espera la respuesta de `fetch` y luego intenta convertirla a JSON. No comprueba explícitamente si la respuesta HTTP fue exitosa ni presenta un mensaje propio si la conexión falla o el servicio devuelve un error.

**Por qué conviene revisarlo:** sin conexión, con el servicio no disponible o ante una respuesta inesperada, el flujo puede detenerse antes de mostrar una explicación útil a la persona usuaria.

**Posible decisión:** definir qué mensaje debe verse cuando la consulta falla y cómo se debe informar el problema para poder depurarlo. Esa decisión debería conservar la diferencia entre un correo repetido y un fallo técnico.

### 4. Evitar mostrar contraseñas en la consola

**Qué ocurre ahora:** cuando las dos contraseñas no coinciden, el `console.error` incluye los valores de ambas contraseñas.

**Por qué conviene revisarlo:** la consola del navegador es una herramienta de diagnóstico, no un lugar adecuado para imprimir credenciales. Otra persona con acceso al navegador o a una captura de la consola podría ver esos valores.

**Posible decisión:** conservar el registro del error, pero describir el problema sin incluir los textos introducidos. Este documento no cambia esa línea del script.

### 5. Limitar qué datos se borran al cerrar sesión

**Qué ocurre ahora:** `logout` llama `localStorage.clear()`, lo que elimina todas las entradas de `localStorage` para el mismo origen, no únicamente `emailUsuario`.

**Por qué conviene revisarlo:** si en el futuro otras partes del sitio guardan preferencias o datos en `localStorage`, también se borrarían al cerrar sesión.

**Posible decisión:** definir cuáles claves pertenecen a la sesión de Lumina y borrar únicamente esas claves. La elección depende de qué otros datos decida almacenar la aplicación más adelante.

### 6. Definir qué significa “tener una sesión iniciada”

**Qué ocurre ahora:** `validarRegistro` considera que hay un usuario registrado cuando encuentra el valor `emailUsuario` en `localStorage`. Además, el script redirige a `bienvenida.html` en las páginas cuya ruta no coincide exactamente con `/bienvenida.html`.

**Por qué conviene revisarlo:** `localStorage` persiste en el navegador y puede modificarse desde las herramientas de desarrollo. Por ello, la existencia de un correo allí sirve para un ejercicio de navegación, pero no demuestra una identidad verificada ni constituye una autenticación segura.

**Posible decisión:** para una demostración escolar, explicar claramente que se trata de una condición local y simulada. Para un sistema con cuentas reales, definir autenticación en un servidor. También se puede revisar la comparación exacta de la ruta si el proyecto se publica dentro de una subcarpeta o cambia su organización.

### 7. Alinear el nombre de las variables y el estilo con `docs/AGENT.md`

**Qué ocurre ahora:** varias variables del script tienen nombres en inglés, por ejemplo `nameInput`, `emailInput` y `confirmPasswordInput`. Además, las funciones pasadas a `map` y `filter` están escritas como funciones tradicionales, mientras que la guía pide funciones flecha.

**Por qué conviene revisarlo:** la guía del proyecto pide nombres en español y usar siempre funciones flecha. Seguir una convención uniforme ayuda a que el código sea más sencillo de leer y mantener en este proyecto.

**Posible decisión:** hacer una revisión de estilo del script y sus nombres, cuidando que todos los identificadores usados por el HTML y las funciones sigan coincidiendo. No se realizó esa refactorización porque la solicitud pidió no implementar correcciones ni mejoras.

### 8. Revisar la relación entre el registro y las pantallas de diseño

**Qué ocurre ahora:** en la maqueta `rediseño-pantallas.html` que se observó durante la planificación, los identificadores y datos del formulario no coincidían completamente con los que `script.js` consulta (`name`, `edad`, `email`, `password` y `confirm-password`). Además, esa maqueta reunía diseños de registro y bienvenida en un mismo archivo.

**Por qué conviene revisarlo:** enlazar directamente la función actual con un formulario que no contiene todos esos campos podría hacer que el código intente leer un valor de un elemento inexistente. Cambiar identificadores o adaptar el script sería una decisión de implementación, no una conexión HTML inocua.

**Posible decisión:** cuando el archivo vuelva a estar disponible, decidir si debe ser una página funcional, una referencia visual sin lógica o si se deben adaptar sus campos para reutilizar el mismo flujo. La maqueta no se recreó ni se integró en esta tarea porque ya no estaba presente al empezar los cambios.

## Resumen

La integración realizada se limita a invocar el registro desde `onclick` en el HTML funcional. Los puntos anteriores son explicaciones para una posible revisión futura; no alteran las reglas, los mensajes, los datos guardados ni el comportamiento existente de `script.js`.
