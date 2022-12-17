#!/bin/bash

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
source /root/.nvm/nvm.sh
nvm install node --lts
nvm use node --lts
npm install react
npm run build
mkdir -p /var/www
cp -r build/* /var/www/
nginx
while [ true ]; do 
	sleep 2s;
done
