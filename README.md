# Monorepo base

## IDE y extensiones recomendadas
Se aconseja el uso de Visual Studio Code aunque se puede usar cualquir IDE donde el desarrollador se sienta cómodo.

Las extensiones recomendadas a continuación pertenecen a este IDE, pero es muy probable que estén desarrolladas también para otros:
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
- [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)


## Comandos globales
Las dependencias de desarrollo son globales y se configuran en la paquete raíz del mono-repo. Para que un nuevo paquete pueda ejecutar estos comandos, tiene que implementarlos en su package.json de forma similar [al ejemplo de este repositorio](packages/core/package.json).

### Build
Para lanzar el build de todos los proyectos simultáneamente, basta con ir a la carpeta raíz del proyecto base y ejecutar ```npm run build``` (este script se apoya en la herramienta [Lerna](https://lernajs.io/))

Si quieres ejecutar el build a nivel individual bastará con ir al proyecto objetivo (los diferentes proyectos dentro de la carpeta *packages*) y ejecutar ```npm run build```.

### Documentación
El índice de la documentación es el README.md del paquete raíz. Es importante referenciar las documentaciones de todos los subpaquetes desde ahí. Al ser documentación en markdown pensada para alojarse en el repositorio, es importante generarla cuando haya cambios, por lo que hay un comando hook para generarla tras cada build.

La documentación de todos los paquetes se crea con ``lerna run docs`` o ```npm run docs``` para un sólo paquete.

### Playground
Es el lugar perfecto para realizar pruebas integradas. No necesariamente E2E, a lo mejor quieres probar como se comporta la función "X" del paquete "A" con la función "Y" del paquete "B", a fin de validar los resultados de las funciones siguiendo un flujo mas completo que solo una prueba unitaria, argumentos, posibles mejoras, etc.

Para hacer funcionar el playground, se necesita realizar los siguientes pasos:

- Configurar las dependencias. Se deben agregar las dependencias que se quieran probar, es aconsejable agregar todas (no los otros playgrounds!), de esta forma no te tienes que preocupar por las dependencias mas adelante, durante el desarrollo.
- Para enlazar los diversos packages en local hay que ejecutar el siguiente comando ``lerna bootstrap``.
- Para servir el playground hay que ejecutar desde la carpeta raiz, ``npm run serve``
- En caso de tener multiples playgrounds, se debe configurar el puerto de estos. Por defecto es el puerto `8080`. Pero se puede modificar el valor en el package.json del package playground.

En caso de agregar una dependencia en un package previamente enlazado, es muy probable que falle, porque Lerna no es el chico mas inteligente de la escuela. Para que lo tome en cuenta, hay que ejecutar el siguiente comando ``lerna clean && lerna bootstrap``. Esto reenlazara los paquetes de nuevo, incluyendo la nueva dependencia.

## Testing
Se ejecuta con ``lerna run test`` y en un paquete individual con ``npm run test``. Puede depurarse un archivo de tests independiente en VSCode pulsando F5 con el archivo abierto.

## Documentación de la API
* ["Core"](packages/core/docs/README.md)

## [Changelog](changelog.md)
