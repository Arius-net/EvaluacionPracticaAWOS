# Usa una imagen de Node.js ligera
FROM node:20-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto donde corre Next.js
EXPOSE 3000

# Comando para arrancar la app en modo desarrollo (ideal para tu práctica)
CMD ["npm", "run", "dev"]