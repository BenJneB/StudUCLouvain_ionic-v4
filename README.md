# StudUCLouvain_ionic-v4 (Map/Studies Not Fixed)
## WIP - Work In Progress
## Migration to ionic-v4


## Map in progress - Studies ~ 90%<br>Studies, Map, Guindaille and Tuto Pages to render/fix


### TO FIX
#### ERROR Error: "Uncaught (in promise): overlay does not exist"
(https://github.com/UCL-INGI/StudUCLouvain_ionic-v4/issues/22) ==> Easy to pop on NewsPage, EventsPage, SportsPage
FIND : npx tslint -c ionic-migration.Json -p tsconfig.json --fix
==> Add .then() to modal etc. (TO MANAGE)

#### ERROR An error was thrown in afterAll
  Uncaught TypeError: Cannot read property 'id' of undefined thrown
  #### RANDOM !? FIX IT !


### TO DO :

=> Routes (Studies (= some sub pages))

#### ==> + Map : remake from 'scratch' /!\ (WIP)

=> Render (Same + Guindaille&Tuto to fix)

=> Write unit tests (WIP)

=> Functional tests ?


Find collaborators ?


# Testing : Current displayed coverage cover only files that have .spec.ts and dependencies

### To launch only one test page : replace first describe by fdescribe ;)
