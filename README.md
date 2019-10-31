[![Maintainability](https://api.codeclimate.com/v1/badges/b3a272ba9c2f4de6ed09/maintainability)](https://codeclimate.com/github/BenJneB/StudUCLouvain_ionic-v4/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b3a272ba9c2f4de6ed09/test_coverage)](https://codeclimate.com/github/BenJneB/StudUCLouvain_ionic-v4/test_coverage)
[![Gitter](https://badges.gitter.im/StudUCLouvain_ionic-v4/community.svg)](https://gitter.im/StudUCLouvain_ionic-v4/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<div style="text-align: center;">
  
# StudUCLouvain (ionic-v4)

## WIP - Work In Progress
## Feel free to collaborate.

### Anyone wishing to participate and/or propose new fixtures/ideas to improve the app should not hesitate to contact StudUCLouvain@uclouvain.be or directly make a pull-request on the repo concerned.
</div>

# TO DO :

- Common platforms

  * Studies Page : Right menu toggle

  * Map Page
  
  * Improve managment of HttpErrorResponse (ex: wso2-service l56) & Errors

- Make working on devices (iOS & Android)

- Design & "Ergonomie"

- Verify all imports (WIP)

- Write unit tests (WIP)

  * Write pertinent tests (not only covering tests)

- Functional tests ? (WIP)

  * Make user stories (1/?)

       
### TIPS
#### - To launch only one test page : replace the 'describe' with the wanted scope by fdescribe in <page_name>.spec.ts

&nbsp;
       
# README :

### More informations :

#### https://github.com/UCL-INGI/StudUCLouvain (+- Outdated)


## Prerequisites
- Download nodejs (LTS) from https://nodejs.org/en/download/current/ It will install `node` and `npm`
```bash
node -v
 - should be >= 12.0.0
npm -v
 - should be >= 6.0.0
```

- For iOS, update XCode version to 8.0 or higher


## Getting Started

* Clone this repository

* Install Ionic & Cordova
    ```bash
    $ npm install -g ionic cordova
    ```

* Install node_modules
    ```bash
    $ npm install
    ```    

* Replace the value of "wso2HeaderStudent" by the appropriate value in the file StudUCLouvain/src/environments/environments.ts


### Launch on browser
```bash
$ ionic serve
```


### Launch on platform

#### Before
```bash
$ ionic cordova prepare
$ ionic cordova platform add <platform>
```

#### Build
```bash
$ ionic cordova build <platform>
$ ionic cordova build <platform> --prod
$ ionic cordova build <platform> --prod --release
```


#### Emulate
```bash
$ ionic cordova emulate <platform>
```

#### Run on device
```bash
$ ionic cordova run <platform> (emulate if device not found)
```

## Tests

### Unit Tests : Karma
To run the unit tests
```bash
$ npm run test
$ npm run test:once # single run
$ npm run test:onceAndCoverage
```
       
### E2E Tests : Protractor
To run the E2E tests
```bash
$ npm run e2e
```

       
### Both
To run both : single run with coverage and e2e
```bash
$ npm run ci
```


## Features

* Campus choices : Louvain-la-Neuve, Mons, Woluwé
* Display course schedule (ADE) and select your session
* Add course schedule to your calendar
* Display annual course program
* Display Libraries schedule and more informations
* Display News of UCL
* Display Events of CarpeStudentem
* Display Sports schedule
* Launch carpooling app https://www.commuty.net
* Launch train app https://www.belgiantrain.be/fr/travel-info/prepare-for-your-journey/use-the-sncb-app
* Launch bus app https://nextride.be/timetables
* Launch Resto4u app
* Help Desk, How to connect to the university network
* Maps with point of interest on campus
* Staffbook
* Campaign Guindaille2.0

## Contribution
Contributions are welcome!

* Report issues
* Open pull request with improvements
* Spread the word

## Contact
* In case of problems, please contact us : StudUCLouvain@uclouvain.be

## License
Stud.UCLouvain is available under the GNU/GPLv3 license. See the LICENSE file for more info.
