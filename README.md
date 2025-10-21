# Aplicativo Todo List

📌 Descrição do Projeto:
---
Este projeto tem por objetivo a criação de um aplicativo Todo List, foi desenvolvido como parte da disciplina de Projeto de interface Web ministrada pelo professor: Thiago Guimarães Tavares no curso de Sistemas para Internet do IFTO - Campus Palmas.
O objetivo é gerenciar tarefas de forma simples e intuitiva, permitindo adicionar, marcar como concluída e excluir tarefas, contendo assim todas as funcionalidades CRUD.

O projeto segue as 3 regras e 6 orientações do Steve Krug (autor do livro - **Não me faça Pensar**):

3 Regras de Steve Krug
---

**1- Não me faça pensar:**

&nbsp;&nbsp;&nbsp;&nbsp;*O usuário não deve precisar pensar para entender como usar algo. Cada elemento da interface deve ser óbvio e autoexplicativo.*

**2- Elimine as perguntas:**

&nbsp;&nbsp;&nbsp;&nbsp;*Se um usuário precisa parar para se perguntar “o que isso faz?” ou “onde eu clico agora?”, há um problema de usabilidade.*

**3- Não desperdice o tempo do usuário:**

&nbsp;&nbsp;&nbsp;&nbsp;*Simplifique o caminho até o objetivo. Evite passos ou informações desnecessárias e mantenha tudo o mais direto possível.*


6 Orientações de Steve Krug
---

**1- Crie páginas que o usuário possa escanear (não ler linha por linha):**

&nbsp;&nbsp;&nbsp;&nbsp;*As pessoas leem na web rapidamente; use títulos claros, listas e destaque visual para facilitar a leitura.*

**2- Use convenções conhecidas:**

&nbsp;&nbsp;&nbsp;&nbsp;*Siga padrões familiares (ícone de lupa para busca, logo no canto superior esquerdo, etc.). Isso reduz o esforço cognitivo.*

**3- Deixe claro onde o usuário está:**

&nbsp;&nbsp;&nbsp;&nbsp;*Use indicadores visuais, menus e títulos consistentes para mostrar a posição e o contexto dentro do site.*

**4- Reduza o número de cliques, mas sem sacrificar a clareza:**

&nbsp;&nbsp;&nbsp;&nbsp;*A navegação deve ser curta, mas compreensível. Um clique a mais é aceitável se tornar o caminho mais óbvio.*

**5- Teste cedo e frequentemente:**

&nbsp;&nbsp;&nbsp;&nbsp;*Faça testes de usabilidade simples com usuários reais desde o início. Mesmo poucos testes revelam problemas valiosos.*

**6- Remova o que não é essencial:**

&nbsp;&nbsp;&nbsp;&nbsp;*Menos é mais. Cada elemento deve ter um propósito claro. Se não ajuda o usuário a atingir seu objetivo, elimine-o.*


Wireframe
---
O projeto foi desenvolvido com base em um wireframe previamente planejado
<img width="1823" height="817" alt="Screenshot from 2025-10-21 08-28-07" src="https://github.com/user-attachments/assets/1ed6e4d3-b4e4-4f44-8887-a1684992e281" />


⚙️ Funcionalidades Principais
---
✅ Adicionar novas tarefas

🗑️ Excluir tarefas concluídas

✏️ Editar nomes de tarefas

🌙 Alternar entre tema claro/escuro (Descrever aqui as funcionalidades do seu app)

🧩 Tecnologias utilizadas
---
**1. HTML5**

Usado para estruturar todas as páginas — login, cadastro, tarefas, nova tarefa, edição, percentual e recuperação de senha.
Cada tela segue boas práticas semânticas (uso de ```<form>```, ```<input>```, ```<button>```, ```<section>```, etc.).

**2. CSS3**

A base de estilos é feita com:

*TailwindCSS* (via CDN) — fornece classes utilitárias para responsividade, espaçamento e tipografia.

*style.css* personalizado — define variáveis de cor (```--bg```, ```--dark```, ```--card```, etc.), botões (```.btn-primary```, ```.btn-secondary```), containers (```.card```, ```.web-center```), inputs e animações (toasts de sucesso/erro).

**3. JavaScript (Vanilla JS)**

Arquivo principal: main.js
Responsável por toda a lógica da aplicação:

&nbsp;&nbsp;&nbsp;&nbsp;- **CRUD** de tarefas (criar, listar, editar, excluir).

&nbsp;&nbsp;&nbsp;&nbsp;- Armazenamento local via localStorage (usuários, tarefas) e sessionStorage (sessão do usuário logado).

&nbsp;&nbsp;&nbsp;&nbsp;- Autenticação local (cadastro, login, logout).

&nbsp;&nbsp;&nbsp;&nbsp;- Redirecionamentos entre páginas (ex: cadastro → login, login → tarefas).

&nbsp;&nbsp;&nbsp;&nbsp;- Exibição dinâmica da lista de tarefas e dos gráficos.

&nbsp;&nbsp;&nbsp;&nbsp;- Geração de gráficos interativos com **Chart.js** (percentual concluído/pendente, barras semanais).

&nbsp;&nbsp;&nbsp;&nbsp;- Responsividade e manipulação de eventos DOM (submit, click, change).


🚀 Como Executar o Projeto
---
Há duas maneira de executar o projeto, localmente e diretamente da pasta:

**1- Executar o projeto localmente(recomendado):**

O projeto é feito em HTML, CSS e JavaScript puro, então não precisa de servidor backend — ele pode ser executado diretamente no navegador.

Isso garante que os redirecionamentos e o *localStorage/sessionStorage* funcionem corretamente.

Se tiver Python instalado:

```python3 -m http.server 8080```

Depois, abra no navegador:

```http://localhost:8080/index.html```

**2- Executar diretamente (modo simples):**

Abra o arquivo ```index.html``` com duplo clique.

**⚠️ Atenção: Alguns navegadores (como o Chrome) podem restringir o acesso a localStorage e redirecionamentos quando o arquivo é aberto via file://.**
Se isso ocorrer, use a opção 1 (servidor local).

Fluxo de uso
---

1. Acesse a página inicial (index.html).

2. Clique em Cadastrar e crie um novo usuário.

3. Faça login com o e-mail e senha cadastrados.

4. Adicione, edite ou exclua tarefas conforme necessário.

5. Veja o progresso em Percentual (%).

6. Clique em Sair para encerrar a sessão.





**Obs: Posteriormente estarei atualizando o código conforme for encontrando erros na hora de rodar o projeto!**
