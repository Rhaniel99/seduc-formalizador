
# Direto ao ponto

## Tecnologias Utilizadas

- **Inertia.js** (React) com **Tailwind CSS**
- **Laravel**
- **PostgreSQL**
- **Redis**
- **Docker** 

## Instalação

Siga os passos abaixo para configurar o projeto AEMINA:

1. **Clone o repositório**
```bash
https://github.com/Rhaniel99/seduc-formalizador.git
```

2. **Configure o arquivo .env**
```bash
Copie o arquivo .env.example para .env e ajuste as credenciais conforme necessário.
```

3. **Inicie os containers **
*Todos os containers serão iniciados automaticamente:*
```bash
docker compose up --build -d
```
4. **Instale as dependências do PHP**
```bash
docker compose run --rm composer install
```
5. **Execute as migrations**
```bash
docker compose run --rm artisan migrate
```

6. **Instale as dependências do Node.js:**
```bash
docker compose run --rm node npm i
```
7. **Inicie o front-end**
```bash
docker compose run --rm --service-ports node npm run dev
```
