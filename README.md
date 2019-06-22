# StudUCLouvain_ionic-v4 (Map Not Fixed)
## WIP - Work In Progress
## Migration to ionic-v4


## Map in progress ~ 90%<br>Map, Guindaille and Tuto Pages to render/fix


### TO FIX
#### ERROR Error: "Uncaught (in promise): overlay does not exist"
(https://github.com/UCL-INGI/StudUCLouvain_ionic-v4/issues/22) ==> Easy to pop on NewsPage, EventsPage, SportsPage
FIND : npx tslint -c ionic-migration.Json -p tsconfig.json --fix
==> Add .then() to modal etc. (TO MANAGE)


### TO DO :

=> Map : remake from 'scratch' /!\ (WIP)

=> Render (Guindaille&Tuto to fix)

=> Write unit tests (WIP)

=> Functional tests ?


Find collaborators ?


# Testing : Current displayed coverage cover only files that have .spec.ts and dependencies

### To launch only one test page : replace first describe by fdescribe ;)
