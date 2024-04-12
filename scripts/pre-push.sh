#!/bin/bash

# Demander à l'utilisateur s'il veut créer un snapshot
read -p "Voulez-vous créer un snapshot du schéma Directus? (y/N) " response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]
then
    echo "Création d'un snapshot du schéma Directus..."
    # Générer le snapshot
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml exec -T directus npx directus schema snapshot "./snapshots/$(date '+%Y-%m-%d')-snapshot-$(date '+%s').yaml"
    
    # Ajouter le snapshot au commit existant
    git add ./snapshots/$(date '+%Y-%m-%d')-snapshot-$(date '+%s').yaml
    git commit --amend --no-edit

    echo "Snapshot ajouté et commit modifié."
fi

echo "Continuation du push..."
exit 0
