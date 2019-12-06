!/bin/bash
npm i
docker-compose rm -f
docker-compose up -d  --force-recreate --build
sleep 5 # wait until server is up ( wait for 5 seconds atleast)
npm test # run unit test
export $(xargs <.env)
echo "The api server is currently running on http://localhost:${API_PORT}/api/v1/"