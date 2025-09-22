# Utiliser une image Node.js LTS
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY prisma ./prisma/

# Installer les dépendances
RUN npm install

# Générer le client Prisma
RUN npx prisma generate

# Copier le reste des fichiers
COPY . .

# Exposer le port de l'application
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "run", "dev"]
