# StudUCLouvain_ionic-v4
## Migration to ionic-v4 : WIP - Work In Progress (Map Not Fixed)
## Feel free to collaborate. 
### Anyone wishing to participate and/or propose new features should not hesitate to contact Stud.UCLouvain@uclouvain.be or directly make a pull-request on the repo concerned.

## Map in progress ~ 90%<br>Map, Guindaille and Tuto Pages to render/fix


### TO FIX
#### ERROR Error: "Uncaught (in promise): overlay does not exist"
FIX : npx tslint -c ionic-migration.json -p tsconfig.json --fix
==> Add .then() to modal etc. (TO MANAGE)


### TO DO :

=> Map : remake from 'scratch' /!\ (WIP)

=> Render (Guindaille&Tuto to fix)

=> Write unit tests (WIP)

=> Functional tests ?


## Testing : Current displayed coverage covers only files that have .spec.ts and their dependencies lines

### To launch only one test page : replace first describe by fdescribe ;)
