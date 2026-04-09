# 🍽️ Cardapia

O **Cardapia** é uma aplicação web desenvolvida com o objetivo de sugerir receitas a partir dos ingredientes disponíveis na casa do usuário. A proposta do sistema é facilitar o dia a dia, ajudando na escolha de refeições de forma prática e contribuindo para a redução do desperdício de alimentos.

A aplicação foi construída utilizando **React** ,**Next.js** e **CSS*, contando com autenticação de usuários via **Parse Server** e integração com inteligência artificial para geração de receitas personalizadas.

---

## 👩‍💻 Integrantes

- Lettycia Vitoria
- Anna Beatriz
- Quezia Costa
- Arthur Amaral
- Lucas Fernandes

---

## 📌 Funcionamento do Sistema

Ao acessar o sistema, o usuário visualiza uma página inicial com opções de login e cadastro. Caso não possua conta, pode se cadastrar informando nome de usuário, e-mail e senha. Após a autenticação, o usuário é redirecionado para a área principal do sistema.

A ideia central do Cardapia é permitir que o usuário informe os ingredientes disponíveis em sua despensa. A partir disso, o sistema utiliza inteligência artificial para gerar receitas compatíveis com os ingredientes informados.

Atualmente, a autenticação está implementada, enquanto as funcionalidades de geração e exibição de receitas estão em desenvolvimento.

---

## 🚀 Funcionalidades
- Cadastro de usuários  
- Login de usuários  
- Autenticação com sessão persistente  
- Navegação entre páginas  

---

## 🛠️ Tecnologias Utilizadas

- React  
- Next.js  
- CSS  
- Parse Server  
- Parse JavaScript SDK  
- API Gemini (Google AI)  

---

## 📂 Estrutura do Projeto

front-end/
└── cardapia/
└── app/
├── cadastro/
│ ├── page.js
│ └── cadastro.compile.css
├── entrar/
│ ├── page.js
│ └── entrar.comite.css
├── principal/
├── components/
├── layout.js
├── page.js
└── globals.css

---

## ⚙️ Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório
git clone https://github.com/seu-repositorio/cardapia.git

3. Acesse a pasta do projeto
cd cardapia/front-end/cardapia

5. Instale as dependências
npm install

7. Execute o projeto
npm run dev

9. Acesse no navegador
http://localhost:3000
