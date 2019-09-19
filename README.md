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
       
# README (for sections not in this README) :
# https://github.com/UCL-INGI/StudUCLouvain


## Prerequisites
</div>
- Download nodejs from https://nodejs.org/en/download/current/ It will install `node` and `npm`
```bash
node -v
 - should be >= 10.0.0
npm -v
 - should be >= 6.0.0
```

<div align="center">
       
## Tests

### Unit Tests : Karma
</div>
To run the unit tests
```bash
$ ng test
$ ng test:once # single run
$ ng test:onceAndCoverage
```
<div align="center">
       
### E2E Tests : Protractor
</div>
To run the E2E tests
```bash
$ ng e2e
```

<div align="center">
       
### Both
</div>
To run both (single run) and coverage
```bash
$ ng ci
```
