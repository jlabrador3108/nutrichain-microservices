#!/bin/bash
set -e

# Arranca mongod en foreground en segundo plano con --fork
mongod --replSet rs0 --bind_ip_all --dbpath /data/db --fork --logpath /var/log/mongod.log

# Espera a que Mongo responda
until mongosh --eval "db.adminCommand('ping')" &>/dev/null; do
  echo "Esperando a que Mongo arranque..."
  sleep 1
done

# Inicia ReplicaSet si no está inicializado
INIT_STATUS=$(mongosh --quiet --eval "rs.status()" || echo "NotYetInitialized")
if [[ $INIT_STATUS == *"NotYetInitialized"* ]]; then
  echo "Iniciando ReplicaSet..."
  mongosh --eval "rs.initiate({_id: 'rs0', members: [{_id: 0, host: 'localhost:27017'}]})"
fi

# Ahora detenemos el mongod iniciado con --fork y reiniciamos en foreground
mongod --replSet rs0 --bind_ip_all --dbpath /data/db
