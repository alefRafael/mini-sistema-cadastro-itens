// Classe para representar um item
class Item {
  constructor(nome, descricao, categoria) {
    this.nome = nome;
    this.descricao = descricao;
    this.categoria = categoria;
  }
}

// Array para armazenar os itens cadastrados
const listaItens = [];

// Seletores
const form = document.getElementById("formItem");
const nomeInput = document.getElementById("nome");
const descricaoInput = document.getElementById("descricao");
const categoriaInput = document.getElementById("categoria");
const listaUl = document.getElementById("itens");
const filtroInput = document.getElementById("filtro");

// Função para renderizar os itens na tela
function renderizarLista(filtrados = listaItens) {
  listaUl.innerHTML = "";

  if (filtrados.length === 0) {
    listaUl.innerHTML = "<li>Nenhum item encontrado.</li>";
    return;
  }

  filtrados.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div>
        <strong>${item.nome}</strong> - ${item.descricao} [${item.categoria}]
      </div>
      <button class="remove" onclick="removerItem(${index})">Remover</button>
    `;
    listaUl.appendChild(li);
  });
}

// Função para cadastrar item
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = nomeInput.value.trim();
  const descricao = descricaoInput.value.trim();
  const categoria = categoriaInput.value.trim();

  if (!nome || !descricao || !categoria) {
    alert("Preencha todos os campos!");
    return;
  }

  const novoItem = new Item(nome, descricao, categoria);
  listaItens.push(novoItem);

  renderizarLista();

  form.reset();
});

// Função para remover item
function removerItem(index) {
  listaItens.splice(index, 1);
  renderizarLista();
}

// Função para buscar itens
filtroInput.addEventListener("input", () => {
  const termo = filtroInput.value.toLowerCase();
  const filtrados = listaItens.filter(item =>
    item.nome.toLowerCase().includes(termo) ||
    item.categoria.toLowerCase().includes(termo)
  );

  renderizarLista(filtrados);
});

// Renderizar a lista inicialmente (vazia)
renderizarLista();
