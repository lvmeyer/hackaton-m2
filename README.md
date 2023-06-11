# Hackathon - Carbon HUB

## Description

Ce projet a été réalisé dans le cadre du Hackathon organisé par l'ESGI et l'ESN Carbon.

## Liste des technologies utilisées

- ReactJS
- NestJS
- Bootsrap
- Docker - Docker Compose
- PostegreSQL

## Liste des membres de l'équipe

- Pierre BOITELLE (pboitelle)
- Victor Valéee (VictorValee)
- Ulysse MF (Ulyssee)
- Odessa CHESNEAU (OdessaCh)
- Dan LEVY (lvmeyer)

## Installation

```bash
git clone git@github.com:lvmeyer/hackaton-m2.git

cd hackaton-m2

make build
```

## Génération des Fixtures

```bash
cd hackaton-m2

make seed
```

## Liste des fonctionnalitées

| Développeur     | Fonctionnalité                                                                                                                |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| All             | MCD, Maquette                                                                                                                 |
| Dan LEVY        | Toute la partie authentification                                                                                              |
| Dan LEVY        | Gestion des utilisateurs et des rôles                                                                                         |
| Pierre BOITELLE | CRUD Compétence                                                                                                               |
| Pierre BOITELLE | CRUD Missions, liste des missions possible, création de la route de création d'une mission                                    |
| Pierre BOITELLE | Listing des compétences d'un utilsateur en leur assignant un nombre de points d'expérience                                    |
| Odessa CHESNEAU | Front CRUD Utilisateurs côté RH/Admin                                                                                         |
| Odessa CHESNEAU | Front CRUD Missions côté RH/Admin                                                                                             |
| Odessa CHESNEAU | Front Navbar & Homepage                                                                   

| Victor VALEE   | CRUD Formations, Badges, Level, + relationships   |

| Ulysse MF       | Front Profile, mise en page des différents visuels : compétences / badges / formations / profil / update password par rôle et |
| Ulysse MF       | Front Crétion & Suppression Formation coté RH                                                                                 |
| Ulysse MF       | Front Login                                                                                                                   |
