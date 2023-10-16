#!/bin/bash

ssh -i ./mykaraoke-key.pem ubuntu@ec2-54-200-165-61.us-west-2.compute.amazonaws.com << EOF
    cd mykaraoke
    git pull origin main
    cd mykaraoke-backend
    pm2 delete 0
    npm install
    pm2 start dist/index.js
EOF