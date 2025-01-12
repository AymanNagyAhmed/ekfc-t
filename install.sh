#!/bin/bash
cp .env.example .env

cp ./users-ms/.env.example ./users-ms/.env

cp ./blogs-ms/.env.example ./blogs-ms/.env

docker compose up -d --build