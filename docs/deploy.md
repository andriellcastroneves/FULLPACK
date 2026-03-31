# Deploy Guide

## Visao Geral

Este projeto fica dividido em 3 partes:

- `frontend`: Next.js
- `backend`: FastAPI
- `database`: PostgreSQL gerenciado

Estrutura recomendada de producao:

- `app.seudominio.com` -> frontend
- `api.seudominio.com` -> backend
- banco gerenciado privado -> PostgreSQL

## Regras de Seguranca

- Nunca commitar `.env` real.
- Nunca enviar `SECRET_KEY`, `DATABASE_URL` ou tokens para o frontend.
- Variaveis com `NEXT_PUBLIC_` sao publicas e chegam ao navegador.
- Em producao, use HTTPS em tudo.
- Restrinja CORS apenas aos dominios reais do frontend.

## Variaveis de Ambiente

### Backend

Arquivo de exemplo: `backend/.env.example`

- `DATABASE_URL`: conexao do PostgreSQL
- `APP_ENV`: `development` ou `production`
- `FRONTEND_URL`: URL principal do frontend
- `SECRET_KEY`: chave secreta forte
- `BACKEND_CORS_ORIGINS`: lista separada por virgula com origens permitidas
- `DOCS_ENABLED`: `true` ou `false`

### Frontend

Arquivo de exemplo: `frontend/.env.local.example`

- `NEXT_PUBLIC_API_BASE_URL`: URL publica do backend

## Banco de Dados

Recomendacao:

- usar `Supabase`, `Neon` ou outro PostgreSQL gerenciado
- criar um usuario exclusivo da aplicacao
- ativar backup automatico
- habilitar SSL
- nao usar usuario admin da instancia na aplicacao

## Backend

Recomendacao:

- deploy em `Render`, `Railway` ou `Fly.io`
- subir via Docker ou comando do ambiente
- configurar as variaveis no painel do provedor
- apontar o dominio `api.seudominio.com`

Arquivos preparados:

- `backend/Dockerfile`
- `backend/.dockerignore`

Checklist:

1. Configurar `DATABASE_URL`
2. Configurar `SECRET_KEY`
3. Configurar `APP_ENV=production`
4. Configurar `FRONTEND_URL`
5. Configurar `BACKEND_CORS_ORIGINS=https://app.seudominio.com`
6. Opcional: `DOCS_ENABLED=false`

### Build local da imagem

Na pasta `backend`:

```bash
docker build -t fullpack-backend .
```

### Run local da imagem

```bash
docker run --env-file .env -p 8000:8000 fullpack-backend
```

### Start command esperado no container

O container sobe com:

```bash
uvicorn app.main:app --host 0.0.0.0 --port ${PORT}
```

Em muitos provedores, `PORT` ja vem definido automaticamente.

## Frontend

Recomendacao:

- deploy em `Vercel`
- apontar `NEXT_PUBLIC_API_BASE_URL=https://api.seudominio.com`
- configurar dominio `app.seudominio.com`

## Fluxo de Deploy

1. Subir o banco
2. Configurar variaveis do backend
3. Fazer deploy do backend
4. Validar `GET /health`
5. Configurar variaveis do frontend
6. Fazer deploy do frontend
7. Testar cadastro, consulta e geracao de pedido

## Ambientes

Sugestao minima:

- `development`
- `staging`
- `production`

Cada ambiente deve ter:

- banco separado
- variaveis separadas
- URLs separadas
- credenciais separadas

## Proximos Passos

Depois desta base, os proximos arquivos recomendados sao:

1. pipeline CI para `lint` e `build`
2. autenticacao para rotas administrativas
3. rate limiting no backend
4. migrations do banco com Alembic
