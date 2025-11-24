var ul = document.getElementById("ul_pr");

function add(id) {
  // Encontrar o elemento da imagem para pegar o src
  const imgElement = document.getElementById(id);
  const imgSrc = imgElement ? imgElement.src : "";

  // Parse do ID: "Nome || Preço"
  let parts = id.split("||");
  let name = parts[0].trim();
  let priceStr = parts[1] ? parts[1].trim() : "0";
  
  // Limpar string de preço para número
  let price = parseFloat(priceStr.replace(/[^0-9.]/g, ''));

  // Pegar carrinho atual
  let cart = JSON.parse(localStorage.getItem('doceCart')) || [];

  // Verificar se item já existe
  let existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1,
      image: imgSrc
    });
  }

  localStorage.setItem('doceCart', JSON.stringify(cart));

  // Feedback visual na lista da página (mantendo funcionalidade original melhorada)
  var li_new = document.createElement("li");
  li_new.textContent = `${name} - Adicionado!`;
  ul.appendChild(li_new);
  ul.appendChild(document.createElement("br"));
  
  alert("Produto adicionado ao carrinho com sucesso!");
}

window.emptyList = function () {
    var ul = document.querySelector('#ul_pr');
    ul.innerHTML = "";
    // Opcional: Limpar localStorage também?
    // localStorage.removeItem('doceCart'); 
    // O botão diz "Limpar Minha Lista", pode ser interpretado como limpar o carrinho ou só a lista visual.
    // Vou assumir que é só a lista visual por enquanto, para não deletar o carrinho sem querer.
}

// Search Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const searchTerm = params.get('search');

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    const images = document.querySelectorAll('img[onclick^="add"]');
    let foundCount = 0;

    // Hide all category headers initially if we are searching
    // But simpler approach: just hide images that don't match.
    // If we want to be fancy, we could hide empty categories, but let's start simple.

    images.forEach(img => {
      const productName = img.id.toLowerCase();
      if (productName.includes(term)) {
        img.style.display = 'inline-block';
        foundCount++;
      } else {
        img.style.display = 'none';
      }
    });

    // Show a message if search is active
    const mainHeader = document.querySelector('.main-head-of-products');
    if (mainHeader) {
      const resultMsg = document.createElement('div');
      resultMsg.style.textAlign = 'center';
      resultMsg.style.margin = '20px 0';
      resultMsg.style.fontSize = '18px';
      resultMsg.innerHTML = `Resultados para: <strong>${searchTerm}</strong> (${foundCount} encontrados)`;
      mainHeader.insertAdjacentElement('afterend', resultMsg);
      resultMsg.scrollIntoView({ behavior: 'smooth' });
    }
  }
});