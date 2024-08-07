#!/bin/bash

# Check if .env file exists
if [ -f .env ]; then
  # Export each line in the .env file as a variable
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found"
fi
