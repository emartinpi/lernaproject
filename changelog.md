# Changelog
Todos los cambios importantes de este proyecto, estarán documentados en este fichero

El formato esta basado en [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
y el proyecto se rige con las versiones [Semantic Versioning](http://semver.org/spec/v2.0.0.html)

## Glosario
Package: Proyectos

## [Unreleased]

- Se agrego Lerna, como gestor Monorepo
- Se Agrego typescript. 
- Se Agrego Rollup. Los packages hacen uso de rollup.config.js
- Se Agrego Jest para pruebas unitarias. Los packages hacen uso de [tsconfig.jest.json](https://github.com/kulshekhar/ts-jest)
- Se agrego Tslint como linter, usando la configuración de [airbnb](https://github.com/progre/tslint-config-airbnb)
- Se Agregó typedoc para generar la documentación de los ficheros .ts de manera automatizada.
- Se creó una carpeta llamada .vscode para centralizar la configuración del workspace de Visual Studio Code y no tener conflictos con las tabulaciones, espacios, etc.