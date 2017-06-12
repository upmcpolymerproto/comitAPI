#!/bin/bash
docker build -t galaxyAPINode:v1 .
docker tag galaxyAPINode:v1 192.168.99.100:5000/galaxyAPINode:v1
docker push 192.168.99.100:5000/galaxyAPINode:v1
docker images
