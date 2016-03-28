#!/bin/bash
# Check and make sure we have keys, if not make them
if [[ ! -e keys/public.key && ! -e keys/public.key ]];
then
  echo """
  Keys were not mounted into the container, this is ok for development but when
  running in production we don't want to blow away these keys everytime.
  Consider mounting in <your/path/to/keys>:/app/keys
  """
  mkdir keys
  npm run keygen
fi;

# Production vs dev requirements
if [[ "$NODE_ENV" = "production" ]];
then
  echo """
  Running in production, just checking a few things
  """
  if [[ ! -e config/database/configs/production.json ]];
  then
  echo """
  WARNING: no production database config found, consider mounting in the config
  directory from the host where that config lives. UNSETTING NODE_ENV!!!
  """
  unset NODE_ENV;
  fi;
fi;

echo "NODE_ENV set to $NODE_ENV";

if [[ "$NODE_ENV" = "development" ]];
then
	echo "Starting development mode";
	echo -e "In another pane run:\n\tdocker exec -it $HOSTNAME bash";
	while true; do sleep 100000000; done;
	exit 0;
else
	npm run bootstrap
	npm start
fi;

