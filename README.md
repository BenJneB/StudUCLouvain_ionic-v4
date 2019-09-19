<div align="center">

# StudUCLouvain : Migration to ionic-v4

## WIP - Work In Progress
## Feel free to collaborate.

### Anyone wishing to participate and/or propose new fixtures/ideas to improve the app should not hesitate to contact StudUCLouvain@uclouvain.be or directly make a pull-request on the repo concerned.
</div>

### TO DO :

- Write unit tests (WIP)

  1. Create \*.spec.ts for all pages
     - subpages
  2. Cover important parts with tests
     - subpages
     - services

- Functional tests ? (WIP)

  * Make user stories (1/?)

<div align="center">
       
### TIPS
#### - To launch only one test page : replace the 'describe' with the wanted scope by fdescribe in <page_name>.spec.ts

&nbsp;
       
## README (for sections not in this README) :
### https://github.com/UCL-INGI/StudUCLouvain


### Prerequisites
Download nodejs from https://nodejs.org/en/download/current/ It will install `node` and `npm`
```bash
node -v
 - should be >= 10.0.0
npm -v
 - should be >= 6.0.0
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
To run both (single run) and coverage
```bash
$ npm run ci
```
</div>
