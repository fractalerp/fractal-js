#!/bin/bash

# Script used to get environment variable from th CI environment and then make it
# available for the apps

echo DEFAULT_TIMEZONE="'$DEFAULT_TIMEZONE'" >> backend/.env
echo JWT_SECRET="'$JWT_SECRET'" >> backend/.env
