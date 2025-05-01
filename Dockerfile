# مرحله بیلد
FROM node:20-alpine AS builder

WORKDIR /app

# فقط package.json رو کپی کن
COPY package.json ./
RUN npm install

COPY . .

RUN npm run build

# مرحله ران‌تایم
FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
