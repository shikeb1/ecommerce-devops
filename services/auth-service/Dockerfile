from node:18-alpine
workdir /app
copy package.json .
run npm install
copy . .
expose 5000
cmd ["node","index.js"]
