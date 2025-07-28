FROM node:22.14.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

COPY . ./

RUN ls -a

ENV APP_ENV=production

RUN npm install --frozen-lockfile

RUN npm run build

RUN rm -r src

EXPOSE 8000

CMD ["npm", "run", "start:prod"]