# Etapa 1: Construcción de la aplicación
FROM node:18 as build

# Crear el directorio de la aplicación
RUN mkdir -p /app

RUN chmod -R 777 /app

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia los archivos de la aplicación
COPY . .

# Exponer el puerto
EXPOSE 3000

CMD [ "npm","run","start"]
