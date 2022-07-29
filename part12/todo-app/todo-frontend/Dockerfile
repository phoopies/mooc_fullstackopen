FROM node:16 as base
WORKDIR /usr/src/app
COPY . .
RUN npm ci

FROM base as test
RUN CI=true npm test

FROM base as serve
ENV REACT_APP_BACKEND_URL=http://localhost:3000
RUN npm run build
RUN npm install -g serve
CMD ["serve", "build"]