# مرحله 1: ساخت
FROM node:18-alpine AS builder

# تنظیم دایرکتوری کاری
WORKDIR /app

# نصب وابستگی‌ها
COPY package.json package-lock.json* ./
RUN npm install

# کپی بقیه سورس پروژه
COPY . .

# ساخت پروژه Next.js برای تولید
RUN npm run build

# مرحله 2: اجرا
FROM node:18-alpine AS runner

# دایرکتوری کاری
WORKDIR /app

# فقط فایل‌های موردنیاز برای اجرا
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# تنظیم متغیر محیطی
ENV NODE_ENV production

# پورت پیش‌فرض
EXPOSE 3000

# اجرای اپلیکیشن
CMD ["npm", "start"]
