#!/bin/bash

bash ./install.sh
cd ./frontend 
tsx ./src/server/server.ts & npm run dev
