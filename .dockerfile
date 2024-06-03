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

# Construye la aplicación
RUN npm run build


# Exponer el puerto
EXPOSE 80
# Ejecuta Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]