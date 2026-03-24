# Product Explorer

## Design and trade-offs

### Naming and Folder structure

This project follows the Angular styling guide which can be found in [style-guide](https://angular.dev/style-guide).

This project adheres to the Feature-based folder structure. see [blog](https://www.angular.courses/blog/angular-folder-structure-guide).

### Styling

I used the 7-1 sass design pattern and BEM naming convention (described more in the README.md).

### State management

I chose to keep the state management simple because this app is small by creating service-like stores with signals.
However, if this was a bigger application, I would have used the [ngrx signal store](https://ngrx.io/guide/signals) or [ngrx store](https://ngrx.io/guide/store).

### Testing

I used the new vitest to do unit tests and have created a unit test for the Catalog page (component) and auth service.
I installed playwright and created an e2e test for the getting, searching and filtering of products, and viewing product-details on the Catalog page.

### Simulating real-world

Because this application doesn't do any http calls to retrieve data and only retrieve the data from assets/json, I created a mockService to retrieve data and simulated where I would have made the http calls and return the mocked data as an Observable (as the http service would have).

I also created a simulated "authentication" mechanism in order to use that as a way to "guard" the admin route. 

## AI usage and prompts

I have used AI very little in this project to showcase my hands on work.
I've used AI to help in improvements of Accessibility and used AI to help in resolving unit/e2e testing issues.
I've also ask AI to help in designing the illustrations.

### Some AI prompts used (but not limited to)

1. Act as a senior UI/UX designer. You are designing a website that needs illustrations for cards. Design a 401 unauthorized illustration using the following colour palette: 

```scss
--colour-primary: #1a4ad9;
--colour-secondary: #1DA1F2;
--colour-tertiary: #7ED923;
--colour-quaternary: #ECF229;
--colour-quinary: #F25C05; 
```

1. Act as a senior web developer. You are unit testing functionality on a products catalog page and ran into the below error. Show the fix and the steps you took into resolving the issue.
// error:
```bash
Argument of type '{ products$: WritableSignal<Product[]>; isLoading$: WritableSignal<boolean>; hasProducts: () => true; }' is not assignable to parameter of type 'readonly (keyof ProductStore)[] | { readonly products$?: Signal<Product[]> | undefined; readonly productDetails$?: Signal<Product | null> | undefined; ... 5 more ...; readonly isLoading$?: Signal<...> | undefined; } | undefined'. Types of property 'hasProducts' are incompatible. Type '() => true' is not assignable to type 'Signal<boolean>'. Type '() => true' is not assignable to type '{ [SIGNAL]: unknown; }'.
```

## Microfrontend (MFE)

In this project we are using the Native Module Federation (@angular-architects/native-federation) to register our application as a microfronend.

In order to create a host shell and use this project as one of the remotes, you need to follow the steps below:

### Host application setup

1. Install the Native Federation in the host application by running command: `npm i @angular-architects/native-federation`
1. Initialise the application as a host by running command (making sure to replace the text in **[brackets]**): `ng g @angular-architects/native-federation:init --project [project-name] --port [port-number] --type dynamic-host`
1. Update the entry urls in the host applications federation.manifest.json. **Example:**

```json
{
  "ng-product-explorer": "https://localhost:4200/remoteEntry.json"
}
```

4. Update the host application federation.config.ts. **Example:**

```js
export default withNativeFederation({
  name: 'host',

  remotes: {
    products: 'http://localhost:4200/remoteEntry.json',
  },

  //... other settings
})
```

5. Set up a route to the remotes product-details page in the host application.

```ts
//... other imports
import { loadRemoteModule } from '@angular-architects/native-federation';

export const routes: Routes = [
  {
    path: 'products',
    loadChildren: () =>
      loadRemoteModule('products', './routes')
        .then(m => m.routes),
  },
  //... other routes
]
```

6. You can now use the router to navigate to any page in the remote application. More specifically the product-details page:

```ts
this.router.navigate(['/products/product-details', productId]);
```

### Remote application setup

1. Install the Native Federation in the remote application by running command: `npm i @angular-architects/native-federation`
1. Initialise the application as a host by running command (making sure to replace the text in **[brackets]**): `ng g @angular-architects/native-federation:init --project [project-name] --port [port-number] --type remote`

> **NB**: I've already setup this application (Product Explorer) as a MFE on port 4200 and will be used as a remote.

### Shared dependencies

You need to add the following to your the federation.config.js of all remote and host applications:

**Either:**

```ts
shared: {
  ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' })
}
```

**OR**

> **NB:** all remotes and hosts must share the same resources

```ts
shared: {
  //...,
  '@angular/core': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  '@angular/common': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  '@angular/router': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
  'rxjs': { singleton: true, strictVersion: true, requiredVersion: 'auto' },,
  'data-access': { singleton: true, strictVersion: true },
  'shared-auth': { singleton: true, strictVersion: true },
  //... etc
}
```
