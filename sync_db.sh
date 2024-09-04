#!/bin/bash

# Variables
LOCAL_DB_CONTAINER="database"
LOCAL_DB_NAME="directus"
LOCAL_DB_USER="directus"
LOCAL_DB_PASSWORD="directus"
DUMP_FILE="directus.dump"

REMOTE_USER="root"
REMOTE_HOST="195.35.0.224"
REMOTE_DB_CONTAINER="database"
REMOTE_DB_NAME="directus"
REMOTE_DB_USER="directus"
REMOTE_DB_PASSWORD="directus"
REMOTE_OTHER_DB="postgres"
REMOTE_OTHER_VPS_DB="msp_directus"

# Exporter la base de données locale
docker exec -t $LOCAL_DB_CONTAINER pg_dump -U $LOCAL_DB_USER -F c $LOCAL_DB_NAME > $DUMP_FILE

# Transférer le fichier dump vers le serveur VPS
scp $DUMP_FILE $REMOTE_USER@$REMOTE_HOST:/tmp/

# Importer la base de données sur le serveur VPS
ssh $REMOTE_USER@$REMOTE_HOST << EOF
    docker cp /tmp/$DUMP_FILE $REMOTE_DB_CONTAINER:/tmp/$DUMP_FILE
    echo 'Starting psql'
    export PGPASSWORD=directus; psql -h localhost -U $REMOTE_DB_USER -d $REMOTE_OTHER_VPS_DB -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'directus' AND pid <> pg_backend_pid();"
    export PGPASSWORD=directus; psql -h localhost -U $REMOTE_DB_USER -d $REMOTE_OTHER_VPS_DB -c "DROP DATABASE IF EXISTS $REMOTE_DB_NAME;"
    export PGPASSWORD=directus; psql -h localhost -U $REMOTE_DB_USER -d $REMOTE_OTHER_VPS_DB -c "CREATE DATABASE $REMOTE_DB_NAME;"
    export PGPASSWORD=directus; pg_restore -h localhost -U $REMOTE_DB_USER -d $REMOTE_DB_NAME -v /tmp/$DUMP_FILE
    echo 'starting psql docker'
    docker exec -t $REMOTE_DB_CONTAINER psql -U $REMOTE_DB_USER -d $REMOTE_OTHER_DB -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = 'directus' AND pid <> pg_backend_pid();"
    docker exec -t $REMOTE_DB_CONTAINER psql -U $REMOTE_DB_USER -d $REMOTE_OTHER_DB -c "DROP DATABASE IF EXISTS $REMOTE_DB_NAME;"
    docker exec -t $REMOTE_DB_CONTAINER psql -U $REMOTE_DB_USER -d $REMOTE_OTHER_DB -c "CREATE DATABASE $REMOTE_DB_NAME;"
    docker exec -t $REMOTE_DB_CONTAINER pg_restore -h localhost -U $REMOTE_DB_USER -d $REMOTE_DB_NAME -v /tmp/$DUMP_FILE
    docker exec -t $REMOTE_DB_CONTAINER rm /tmp/$DUMP_FILE
EOF


echo "Database sync complete!"
