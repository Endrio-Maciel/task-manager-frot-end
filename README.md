## Frontend

O frontend foi desenvolvido utilizando React.js. Ele se comunica com o backend por meio de - requisições HTTP. A interface foi criada para ser simples e intuitiva, com foco na usabilidade.

# Funcionalidades do Frontend:

- Listagem de Tarefas:

Exibe todas as tarefas em uma lista, ordenadas pela ordem.
Tarefas com Custo maior ou igual a R$1.000,00 são destacadas com o fundo amarelo.
Cada tarefa tem os botões de Editar e Excluir.

- Incluir Tarefa:

Exibe um formulário para incluir uma nova tarefa, com os campos Nome da Tarefa, Custo e Data Limite.
Ao submeter o formulário, a tarefa é adicionada à lista com a ordem correta.

- Editar Tarefa:

Ao clicar em Editar, o usuário pode alterar os campos Nome da Tarefa, Custo e Data Limite.
A edição é feita em uma nova tela ou através de um formulário inline, dependendo da escolha de implementação.

- Excluir Tarefa:

Ao clicar em Excluir, o usuário é solicitado a confirmar a exclusão da tarefa.
Reordenar Tarefas:

- Pode usar os botões Subir e Descer para alterar a ordem de cada tarefa individualmente.