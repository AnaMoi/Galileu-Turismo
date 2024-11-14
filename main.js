import { data } from "./data.js";

const container = document.getElementById('elemento-pai');
const header = document.getElementById('header');

function createCard(item) {
    return ` <div class="card_ponto_turistico">

        <div class="card_imagem">
            <img src="${item.imagem}" alt="${item.titulo}">
        </div>

        <div class="card_detalhes">
        <div class="Categorias">
        ${item.categorias.map(cat => `<span>${cat}</span>`).join('')}
               
            </div>

            <h1 class="titulo">${item.titulo}</h1>
            <p>${item.descricao}</p>
        </div>

    </div>`

}
// conteiner.innerHTML += createCard(data[0]);
// conteiner.innerHTML += createCard(data[1]);
function renderCards(data) {
    // Gerar todos os cards e juntar
    const cards = data.map(createCard).join('');
    // adicionar todos os cards de uma vez
    container.innerHTML = cards;
}
// função de criar hearder com categorias unica
function createHeaderCategories(data) {
    // extrair todas as categorias e remove as duplicadas 
    const categoriasUnicas = ['Todas',... new Set(data.flatMap(item => item.categorias))];
    // Criar o HTML do header com todas as categorias
    const categoriasHTML = categoriasUnicas.map(cat => `<button class="categorias-btn">${cat}</button>`).join('');
    header.innerHTML = categoriasHTML;

    // Adicionar eventos de cliques de botões para filtrar
    const buttons = document.querySelectorAll('.categorias-btn');

// laço de repeticao, cada botao recebera uma funcao
buttons.forEach((button, index) => {
// adiconar a classe 'active' ao primeiro botao
if (index === 0) {
    button.classList.add('active')
}

// adicionar o evento de click ao botao//
button.addEventListener('click', () => {
const categoriaSelecionada = button.textContent;
// funcao para realizar o filtro//
filtrarPorCategorias(categoriaSelecionada);
// Remover a classe "active" de todos os botoes//
buttons.forEach(btn => btn.classList.remove('active'));
// Adiconar a classe "active ao botao clicado"//
button.classList.add('active');
});
});
}
function filtrarPorCategorias (categoria) {
    if (categoria === "Todas"){
        renderCards (data); //Renderizar apenas osc ards filtrados
    } else {
        const filteredData = data.filter ( item=> item.categorias.includes(categoria))
        renderCards(filteredData); // Renderiza apenas os cards filtrados
    }
}


renderCards(data);
createHeaderCategories(data);