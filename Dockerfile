FROM node:9.5-alpine

RUN mkdir /sdgs &&  npm set progress=false && npm config set depth 0 && npm cache clean --force

WORKDIR /sdgs

ARG API_BASE_URL=https://api.apihighways.org
ARG GOOGLE_ANALYTICS=UA-90561944-1
ARG NODE_ENV=production
ARG SHOW_FEEDBACK=false

ENV API_BASE_URL $API_BASE_URL
ENV GOOGLE_ANALYTICS $GOOGLE_ANALYTICS
ENV NODE_ENV $NODE_ENV
ENV SHOW_FEEDBACK $SHOW_FEEDBACK

COPY . .

RUN npm i && npm run build

EXPOSE 5000

CMD ["node", "server.js"]
