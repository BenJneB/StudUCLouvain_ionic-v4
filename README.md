# StudUCLouvain_ionic-v4
## Migration to ionic-v4 : WIP - Work In Progress
## Feel free to collaborate. 
### Anyone wishing to participate and/or propose new fixtures/ideas to improve the app should not hesitate to contact StudUCLouvain@uclouvain.be or directly make a pull-request on the repo concerned.

## Map in progress ~ 90%<br>+ Guindaille and Tuto Pages to render<br>+ Home : fix adapt orientation landscape/portrait


### TO FIX
#### ERROR Error: "Uncaught (in promise): overlay does not exist"
FIX : npx tslint -c ionic-migration.json -p tsconfig.json --fix
==> Add .then(...) to modal etc. (TO MANAGE)


### TO DO :

=> Render (Guindaille&Tuto to fix)

=> Write unit tests (WIP)

=> Functional tests ? (Started)
==> Make some scenarios for each page


### To launch only one test page : replace first describe by fdescribe ;)
