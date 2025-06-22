**Passos para Executar:**

1.  **Baixe o Projeto do GitHub:**
    * Clone o repositório (lembre-se que ele está privado, então você precisará estar logado no Git ou usar suas credenciais):
        ```bash
        git clone URL_DO_SEU_REPOSITORIO_PRIVADO_AQUI
        ```
    * Substitua `URL_DO_SEU_REPOSITORIO_PRIVADO_AQUI` pela URL correta do seu repo no GitHub.
    * Entre na pasta que foi criada: `cd NOME_DA_PASTA_DO_PROJETO_CLONADO`

2.  **Configure o Ambiente do Backend:**
    * Navegue até a pasta `backend`:
        ```bash
        cd backend
        ```
    * Crie o ambiente virtual (vamos chamar de `venv`):
        ```bash
        python -m venv venv
        ```
    * Ative o ambiente virtual:
        * **No PowerShell:** `.\venv\Scripts\Activate.ps1`
            *(Lembrete rápido: se o PowerShell reclamar de política de execução, use `Set-ExecutionPolicy RemoteSigned -Scope Process` antes de ativar).*
        * **No CMD (Prompt de Comando normal):** `venv\Scripts\activate.bat`
        *(Você vai ver um `(venv)` no começo do prompt se der certo).*

3.  **Instale as Dependências do Backend:**
    * Ainda na pasta `backend` e com o `(venv)` ativo, rode:
        ```bash
        pip install -r requirements.txt
        ```
        *(Isso vai instalar o FastAPI, Uvicorn, Pydantic e tudo mais que a gente precisa).*

4.  **Ligue o Servidor Backend!**
    * Execute:
        ```bash
        uvicorn app.main:app --reload
        ```
    * *Boa notícia:* A chave da API da Sympla (`SYMPLA_API_KEY`) já está configurada no arquivo `backend/.env` dentro do repositório (porque decidimos subir assim para facilitar na apresentação). O servidor deve encontrá-la automaticamente!
    * O backend vai começar a rodar em `http://localhost:8000`. A documentação da API estará em `http://localhost:8000/docs`.

5.  **Abra o Frontend no Navegador:**
    * Agora, encontre a pasta `frontend` (ela está um nível acima da pasta `backend`).
    * Abra o arquivo `index.html` que está dentro da pasta `frontend` diretamente no seu navegador.
