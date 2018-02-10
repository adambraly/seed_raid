FROM elixir:1.6.1-alpine AS builder
RUN apk update \
    apk add git

RUN mix local.hex --force && \
    mix local.rebar --force && \
    mix hex.info

WORKDIR /app
ENV MIX_ENV prod
COPY . .
RUN mix deps.get
RUN mix phx.digest
RUN mix release --env=$MIX_ENV

FROM alpine:latest

WORKDIR /app
COPY --from=builder /app/_build/prod/rel/seed_raid .

CMD ["./bin/seed_raid", "foreground"]
