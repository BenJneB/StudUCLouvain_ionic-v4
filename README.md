[![Maintainability](https://api.codeclimate.com/v1/badges/b3a272ba9c2f4de6ed09/maintainability)](https://codeclimate.com/github/BenJneB/StudUCLouvain_ionic-v4/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b3a272ba9c2f4de6ed09/test_coverage)](https://codeclimate.com/github/BenJneB/StudUCLouvain_ionic-v4/test_coverage)

<div align="center">
  
# StudUCLouvain (ionic-v4)

## WIP - Work In Progress
## Feel free to collaborate.

### Anyone wishing to participate and/or propose new fixtures/ideas to improve the app should not hesitate to contact StudUCLouvain@uclouvain.be or directly make a pull-request on the repo concerned.
</div>

### TO DO :

- Check Studies Page

  * Right menu toggle

- Check Map Page

- Design & "Ergonomie"

- Verify all imports

- Write unit tests (WIP)

  * Write pertinent tests (not only covering tests)

- Functional tests ? (WIP)

  * Make user stories (1/?)

- Test on devices
       
### TIPS
#### - To launch only one test page : replace the 'describe' with the wanted scope by fdescribe in <page_name>.spec.ts

&nbsp;
       
## README :

### More informations :

#### https://github.com/UCL-INGI/StudUCLouvain


### Prerequisites
- Download nodejs from https://nodejs.org/en/download/current/ It will install `node` and `npm`
```bash
node -v
 - should be >= 10.0.0
npm -v
 - should be >= 6.0.0
```

- For iOS, update XCode version to 8.0 or higher


### Launch on browser
```bash
$ ionic serve
```


### Build
```bash
$ ionic cordova build <platform>
$ ionic cordova build <platform> --prod
$ ionic cordova build <platform> --prod --release
```


### Emulate
```bash
$ ionic cordova emulate <platform>
```


### Tests

#### Unit Tests : Karma
To run the unit tests
```bash
$ npm run test
$ npm run test:once # single run
$ npm run test:onceAndCoverage
```
       
#### E2E Tests : Protractor
To run the E2E tests
```bash
$ npm run e2e
```

       
#### Both
To run both : single run with coverage and e2e
```bash
$ npm run ci
```
