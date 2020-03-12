# HerePlace

This project was generated with 
[Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.
[Node](https://nodejs.org/en) version 8.10.0

## Install Dependecies
To Install node modules run `npm install` 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## About Project
The front-end app is single page app(Anglular and Typescript).

I did't use any UI frameworks (e.g. Boostrap or Material Design),

I made custom carousel component to show item places instead any library (e.g Swiper or owl carousel).

I used HERE rest API to get informations about places and HERE maps to show places on the map. I hardcoded lat and lng to Berlin, alternative should dynamically location from devices.   

Description is showed in plain text to avoid XSS issues,  alternative should be HTML sanitizations.
 
You can see app on http://limehome.edeja.com/