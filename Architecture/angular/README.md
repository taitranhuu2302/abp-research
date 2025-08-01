# Architecture

This is a startup project based on the ABP framework. For more information, visit <a href="https://abp.io/" target="_blank">abp.io</a>

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Remote Environment

The application provides a remote environment for production. we use `dynamic-env.json` file to set the environment variables and configured web server's `getEnvConfig` endpoint by default.

See [Environment](https://abp.io/docs/latest/framework/ui/angular/environment) for more information.