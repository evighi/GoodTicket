# GoodTicket 🎫

**GoodTicket** é uma plataforma para divulgação de eventos, com funcionalidades para exibir eventos via integração com a Sympla e oferecer uma área de revenda de ingressos.

## 📂 Estrutura do Projeto

- `back` → API Node.js (Express + Prisma)
- `front` → Aplicação React
- `backend` → API Python (FastAPI) para integração com a Sympla

---

## 🚀 Como Rodar o Projeto

### 1. Rodar a API Node.js (Backend Principal)

```bash
# Acesse a pasta do backend principal
cd back

# Instale as dependências
npm install

# Inicie o servidor
npm run dev
```

### 2. Rodar o Frontend React

```bash
# Acesse a pasta do front-end
cd front

# Instale as dependências
npm install

# Inicie o projeto
npm run dev
```

### 3. Rodar a API Python (Integração com a API Externa)

```bash
# Acesse a pasta do backend Python

cd backend

# Crie o ambiente virtual (vamos chamar de `venv`):
python -m venv venv

# Ative o ambiente virtual:
# No PowerShell: `.\venv\Scripts\Activate.ps1`
 # (Lembrete rápido: se o PowerShell reclamar de política de execução, use `Set-ExecutionPolicy RemoteSigned -Scope Process` antes de ativar).
  # No CMD (Prompt de Comando normal):** `venv\Scripts\activate.bat`
       # (Você vai ver um `(venv)` no começo do prompt se der certo).

# Instale as Dependências do Backend:
# Ainda na pasta `backend` e com o `(venv)` ativo, rode:
pip install -r requirements.txt
   #(Isso vai instalar o FastAPI, Uvicorn, Pydantic e tudo mais que a gente precisa).

# Ligue o Servidor Backend!
# Execute:
uvicorn app.main:app --reload
```
