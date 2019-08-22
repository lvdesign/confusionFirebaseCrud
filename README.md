# ConFusion advanced by LVdesign.com.fr


## CRUD system

sources : 
  - https://angular-templates.io/tutorials/about/angular-crud-with-firebase
  - https://itnext.io/how-to-crud-in-angular-firebase-firestore-456353d7c62
  - https://www.djamware.com/post/5bbf534580aca7466989441c/angular-6-firebase-tutorial-firestore-crud-web-application


#### Folders & Structure

- environments/ 
  - config.ts :  create your firebase configuration

  export const config = {
      apiKey: 'yourscode',
      authDomain: 'yourscode',
      databaseURL: 'yourscode',
      projectId: 'yourscode',
      storageBucket: 'yourscode',
      messagingSenderId: 'yourscode'
  }


- admin/
    - admin.component
    - /dish-form
        - dish-form.component
    - /updated-dish
        - updated-dish.component
    

- CREATE :  dish-form.component
- READ :    admin.component
- UPDATE :  updated-dish.component
- DELETE :  admin.component


#### Functions

- Firebase 2

- Services : dish.services
    - createDish()
    - updateDish()
    - deleteDish()

- dish-form.component
    - createForm()

- updated-dish.component
    - createForm()


#### Routes

  - { path: 'admin',  component: AdminComponent },
  - { path: 'admin/new' ,  component: DishFormComponent },
  - { path: 'admin/view/:id' ,  component: UpdatedDishComponent },


#### Visibility Admin Section 

 - <a *ngIf="username" mat-button routerLink="/admin" routerLinkActive="active"><span class="fa fa-address-card fa-lg"></span> Admin</a> 






This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve --o` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
