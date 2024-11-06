FROM gcr.io/distroless/nodejs22 as runtime

WORKDIR /app

COPY .next/standalone /app/
COPY public /app/public/
COPY .next/static /app/.next/static

EXPOSE 3000

ENV NODE_ENV=production
ENV TZ="Europe/Oslo"

CMD ["server.js"]
