# Jogo da Memória 🧠
Este é um simples jogo da memória desenvolvido com HTML, CSS e JavaScript. O objetivo é encontrar todos os pares de emojis iguais.

# 📋 Funcionalidades

 Shuffle dos Emojis: Ao iniciar, os emojis são embaralhados aleatoriamente.
 Jogabilidade Intuitiva: Clique em duas cartas para virá-las e descobrir se elas formam um par.
 Sistema de Feedback: Cartas que correspondem ficam abertas e são destacadas; cartas que não correspondem voltam a ficar viradas.
 Alerta de Vitória: Quando todos os pares são encontrados, uma mensagem de vitória aparece.

# 🛠️ Tecnologias Utilizadas

HTML5: Estrutura da página.
CSS3: Estilos e layout, com transições suaves ao virar as cartas.
JavaScript: Lógica do jogo, embaralhamento de cartas e manipulação de DOM.

# 📂 Estrutura do Projeto
.
├── index.html           # Estrutura principal do jogo
├── src
│   ├── styles
│   │   ├── reset.css    # Reset de estilos
│   │   └── main.css     # Estilos do jogo
│   └── scripts
│       └── engine.js    # Lógica do jogo em JavaScript
└── README.md            # Documentação do projeto

# 🎮 Como Jogar

Abra o arquivo index.html em seu navegador.
Clique em duas cartas para revelá-las.
Se as cartas forem iguais, elas permanecerão abertas. Se forem diferentes, serão viradas novamente.
Continue até encontrar todos os pares. Quando todos os pares forem encontrados, uma mensagem "Você venceu!" será exibida.

# 🎨 Paleta de Cores
As cores foram selecionadas a partir da paleta Coolors.

## Fundo do Jogo: #805D93
## Cartas: #FFF com transição suave ao virar
## Fundo do Container: #F49FBC
## Botão de Reset: #FFD3BA com destaque ao focar: #85FFC7

# ⚙️ Funções Importantes

JavaScript (engine.js)
shuffleEmojis: Embaralha a lista de emojis aleatoriamente para cada partida.
handleClick: Lida com a lógica de cada clique nas cartas, incluindo virar e adicionar ao array openCards.
checkMatch: Verifica se duas cartas viradas formam um par. Se forem iguais, as cartas ficam viradas; se não, são ocultadas novamente. Emite um alerta ao final do jogo.

# 🔄 Reiniciar o Jogo

Para reiniciar o jogo, clique no botão "Reset Game".

# 💡 Inspirações e Aprendizado

Este projeto foi feito para praticar manipulação de DOM e lógica de jogos em JavaScript.
