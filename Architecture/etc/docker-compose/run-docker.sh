#!/bin/bash

if [[ ! -d certs ]]
then
    mkdir certs
    cd certs/
    if [[ ! -f localhost.pfx ]]
    then
        dotnet dev-certs https -v -ep localhost.pfx -p c3554439-193e-42fe-8d73-b26e49c9b9f3 -t
    fi
    cd ../
fi

docker-compose up -d
