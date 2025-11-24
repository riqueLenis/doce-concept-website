document.addEventListener("DOMContentLoaded", function () {
  const containerItens = document.querySelector(".carrinho-itens");
  const subtotalElement = document.querySelector(".resumo-linha span:last-child");
  const totalElement = document.querySelector(".resumo-total strong:last-child");
  const freteElement = document.querySelector(".frete-gratis");
  
  // Load cart from localStorage
  let cart = JSON.parse(localStorage.getItem('doceCart')) || [];

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function renderCart() {
    // If container is missing (e.g. already removed), stop
    if (!containerItens) return;
    
    containerItens.innerHTML = "";
    
    if (cart.length === 0) {
      mostrarCarrinhoVazio();
      return;
    }

    cart.forEach((item, index) => {
      const itemHTML = `
        <div class="carrinho-item" data-index="${index}">
          <img src="${item.image || 'images/products-img/women/kurti1.png'}" alt="${item.name}" />
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>Tamanho: Único</p>
            <p class="preco">${formatarMoeda(item.price)}</p>
          </div>
          <div class="item-quantidade">
            <button class="btn-menos">-</button>
            <input type="number" value="${item.quantity}" min="1" readonly />
            <button class="btn-mais">+</button>
          </div>
          <div class="item-total">${formatarMoeda(item.price * item.quantity)}</div>
          <button class="btn-remover" aria-label="Remover item">×</button>
        </div>
      `;
      containerItens.insertAdjacentHTML('beforeend', itemHTML);
    });

    attachEventListeners();
    atualizarTotais();
  }

  function attachEventListeners() {
    const itens = document.querySelectorAll(".carrinho-item");
    
    itens.forEach(item => {
      const index = parseInt(item.dataset.index);
      const btnMais = item.querySelector(".btn-mais");
      const btnMenos = item.querySelector(".btn-menos");
      const btnRemover = item.querySelector(".btn-remover");

      btnMais.addEventListener("click", () => {
        cart[index].quantity++;
        saveCart();
        renderCart();
      });

      btnMenos.addEventListener("click", () => {
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          saveCart();
          renderCart();
        }
      });

      btnRemover.addEventListener("click", () => {
        // Animation before removing
        item.style.transition = "all 0.4s ease";
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        
        setTimeout(() => {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }, 400);
      });
    });
  }

  function saveCart() {
    localStorage.setItem('doceCart', JSON.stringify(cart));
  }

  function atualizarTotais() {
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.quantity;
    });

    if (subtotalElement) subtotalElement.textContent = formatarMoeda(subtotal);

    let frete = 0;
    if (subtotal >= 500) {
      if (freteElement) {
        freteElement.textContent = "Grátis";
        freteElement.style.color = "#27ae60";
      }
    } else {
      frete = 29.9;
      if (freteElement) {
        freteElement.textContent = formatarMoeda(frete);
        freteElement.style.color = "#e74c3c";
      }
      subtotal += frete;
    }

    if (totalElement) totalElement.textContent = formatarMoeda(subtotal + frete);
  }

  function mostrarCarrinhoVazio() {
    const container = document.querySelector(".carrinho-container");
    const vazioHTML = `
      <div class="carrinho-vazio">
        <h2>Seu carrinho está vazio</h2>
        <p>Que tal dar uma olhada nos nossos produtos?</p>
        <a href="products.html" class="btn-finalizar" style="display:inline-block; margin-top:20px; padding:14px 30px;">
          Ir às compras
        </a>
      </div>
    `;

    const itensContainer = document.querySelector(".carrinho-itens");
    const resumoContainer = document.querySelector(".carrinho-resumo");
    
    if(itensContainer) itensContainer.remove();
    if(resumoContainer) resumoContainer.remove();
    
    if(!document.querySelector('.carrinho-vazio')) {
        container.insertAdjacentHTML("beforeend", vazioHTML);
    }
  }

  const btnFinalizar = document.querySelector(".btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      window.location.href = "pagamento.html";
    });
  }

  // Initial render
  renderCart();
});
