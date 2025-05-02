# Age Calculator App

[Voir en ligne](https://roooceee.github.io/AgeCalculator/)

Ce projet est un calculateur d'âge précis (jour, mois, année) créé en réponse au challenge de **Frontend Mentor**.

## Description

L'application permet de calculer l'âge exact d'une personne en fonction de sa date de naissance (jour, mois, année). Le calcul prend en compte les jours, mois et années, et fournit un résultat précis en tenant compte des mois et des jours dans les années bissextiles et les variations du calendrier.

### Fonctionnalités

- Calcul exact de l'âge basé sur la date de naissance.
- Validation des champs pour garantir l'exactitude des données (validation des jours, mois et années).
- Affichage dynamique de l'âge en années, mois et jours.
- Interface responsive, adaptée aux écrans mobiles et de bureau.

## Structure du projet

Le projet est structuré comme suit :

AgeCalculator/
├── index.html # Structure HTML de la page
├── style.css # Fichier de style CSS
├── script.js # Logique JavaScript pour la validation et le calcul de l'âge
└── assets/images # Contient le favicon et le svg de la flèche

### HTML

Le fichier `index.html` contient les champs de saisie pour le jour, le mois et l'année, ainsi qu'un bouton pour soumettre le formulaire. La structure HTML est claire et bien adaptée aux formulaires d'entrée utilisateur.

### CSS
Le fichier style.css contient les règles de mise en page pour garantir une bonne présentation sur différentes tailles d'écran. Le design est responsive et s'adapte aux appareils mobiles.

### JavaScript
Le fichier script.js contient la logique nécessaire pour effectuer le calcul de l'âge exact. Il gère également la validation des champs de saisie et les erreurs associées.

## Fonctionnalités JavaScript :

- **Validation des champs :** Les champs de saisie vérifient que les valeurs sont correctes avant de procéder au calcul de l'âge.

- **Calcul de l'âge :** En utilisant la date actuelle et la date de naissance, le script calcule l'âge exact en années, mois et jours.

- **Messages d'erreur dynamiques :** Si les utilisateurs saisissent des valeurs incorrectes, des messages d'erreur sont affichés sous les champs correspondants.

## Instructions d'utilisation

- Clonez ou téléchargez le projet :

- Utilisez git clone https://github.com/roooceee/AgeCalculator pour cloner le dépôt.

- Ouvrir le projet :

- Ouvrez le fichier index.html dans votre navigateur pour voir l'application en action.

## Utilisation :

Entrez votre date de naissance dans les champs appropriés (jour, mois, année).

Cliquez sur "Submit" pour obtenir votre âge précis en années, mois et jours.

Technologies utilisées
HTML5 pour la structure du contenu.

CSS3 pour la mise en forme et le design responsive.

JavaScript pour la logique du calcul de l'âge et la validation des champs.

## Auteurs
Sébastien LUCAS - Développeur - Portefeuille

## Acknowledgements
Challenge fourni par Frontend Mentor.