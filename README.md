# SIMPLE express microservices with api gateway
Live demo is at   
Base endpoint : <http://204.48.24.199:1337/api/v1/>  

For example to get members by organisation  
<http://204.48.24.199:1337/api/v1/orgs/google/members>  

The docs is at  
<http://204.48.24.199:1337/api/v1/api-docs/>  

----------------------------------------------------------------------------------------
This is an application made with **nodejs**,**express**,**docker** with an es6 syntax .  
Testing is done using **mocha/chai**.  
This application is made for the purpose of answering a **test**.  


_________________________________________________________________________________________
*PREQUISITE*  
Please make sure **DOCKER** and **NODEJS** is **INSTALLED** before running the script

------------------------------------------------------------------------------------------
Change the ```sample.env``` file to .env and change the values with your own values   
By default the api port is using 1337. If you change it please also change the port for nginx in the docker-compose.yml files   

Upon download/cloning please run the bash file   
```
./run.sh
```
Make sure to run script below (**if you're in a *nix environment**)  
To make the script **executable**

```
chmod u+x run.sh 
```
The api docs is available at ```ENDPOINT/api-docs```   
For example is if your API_PORT is 1337    
Api docs is then available at ```http://localhost:1337/api/v1/api-docs```   

