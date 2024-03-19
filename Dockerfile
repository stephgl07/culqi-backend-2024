# Utiliza la imagen base de Node.js
FROM node:16.0.0

# Crea un directorio de trabajo
WORKDIR /usr/src/app

# Instala las dependencias de la aplicación
COPY package*.json ./
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto que usa NestJS
EXPOSE 8080

# Define el comando para iniciar tu aplicación
CMD [ "npm", "run", "start:prod" ]
