# Guía de Directrices para el Desarrollo en JavaScript

Para cualquier tarea de desarrollo, refactorización o escritura de código en este proyecto, debes seguir estrictamente las siguientes normas técnicas:

## 1. Sintaxis y Paradigma
- **Funciones:** Utiliza **siempre funciones flecha** para declarar funciones.
- **Paradigma:** Prioriza la **programación declarativa** (emplea métodos de orden superior como `map`, `filter`, `reduce`, etc., evitando bucles imperativos tradicionales).
- **Condicionales:** Escribe todas las estructuras condicionales **sin utilizar la cláusula `else`** (opta por retornos tempranos, guard clauses o asignaciones directas).
- **Idioma:** Todos los nombres de variables, funciones, parámetros, comentarios y mensajes de la aplicación deben estar **en ESPAÑOL**.

## 2. Manipulación del DOM
- Para seleccionar elementos del documento HTML, utiliza **exclusivamente el método `getElementById`**. Está prohibido el uso de `querySelector` o `querySelectorAll`.

## 3. Persistencia de Datos
- Utiliza **siempre `localStorage`** para almacenar la información necesaria en el navegador. No utilices bajo ningún concepto `sessionStorage`.

## 4. Depuración y Trazabilidad
- Incorpora sentencias de consola (`console.log`, `console.warn` o `console.error`) según corresponda dentro de los condicionales, validaciones o bloques de código críticos para facilitar el monitoreo del flujo.