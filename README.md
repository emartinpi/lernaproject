# Monorepo base

## Comandos globales
Las dependencias de desarrollo son globales y se configuran en la paquete raíz del mono-repo. Para que un nuevo paquete pueda ejecutar estos comandos, tiene que implementarlos en su package.json de forma similar [al ejemplo de este repositorio](packages/core/package.json).

### Build
Se ejecuta en todos los paquetes con ``lerna run build`` o a nivel individual con ```npm run build``` si se ejecuta en la carpeta del paquete objetivo.

### Documentación
El índice de la documentación es el README.md del paquete raíz. Es importante referenciar las documentaciones de todos los subpaquetes desde ahí. Al ser documentación en markdown pensada para alojarse en el repositorio, es importante generarla cuando haya cambios, por lo que hay un comando hook para generarla tras cada build.

La documentación de todos los paquetes se crea con ``lerna run docs`` o ```npm run docs``` para un sólo paquete.

## Testing
Se ejecuta con ``lerna run test`` y en un paquete individual con ``npm run test``.

## Documentación de la API
* ["Core"](packages/core/docs/README.md)

## [Changelog](changelog.md)
 