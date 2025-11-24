document.addEventListener("DOMContentLoaded", function () {
  const itensCarrinho = document.querySelectorAll(".carrinho-item");
  const subtotalElement = document.querySelector(
    ".resumo-linha span:last-child"
  );
  const totalElement = document.querySelector(
    ".resumo-total strong:last-child"
  );
  const freteElement = document.querySelector(".frete-gratis");

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  }

  function atualizarTotais() {
    let subtotal = 0;

    itensCarrinho.forEach((item) => {
      const precoUnitarioText = item.querySelector(".preco").textContent;
      const precoUnitario = parseFloat(
        precoUnitarioText.replace("R$", "").replace(",", ".").trim()
      );
      const quantidade = parseInt(item.querySelector("input").value);
      const totalItem = precoUnitario * quantidade;

      item.querySelector(".item-total").textContent = formatarMoeda(totalItem);

      subtotal += totalItem;
    });

    subtotalElement.textContent = formatarMoeda(subtotal);

    if (subtotal >= 500) {
      freteElement.textContent = "Grátis";
      freteElement.style.color = "#27ae60";
    } else {
      const frete = 29.9;
      freteElement.textContent = formatarMoeda(frete);
      freteElement.style.color = "#e74c3c";
      subtotal += frete;
    }

    totalElement.textContent = formatarMoeda(subtotal);
  }

  itensCarrinho.forEach((item) => {
    const btnMais = item.querySelector(".btn-mais");
    const btnMenos = item.querySelector(".btn-menos");
    const inputQuantidade = item.querySelector("input");
    const btnRemover = item.querySelector(".btn-remover");

    btnMais.addEventListener("click", () => {
      inputQuantidade.value = parseInt(inputQuantidade.value) + 1;
      atualizarTotais();
    });

    btnMenos.addEventListener("click", () => {
      if (parseInt(inputQuantidade.value) > 1) {
        inputQuantidade.value = parseInt(inputQuantidade.value) - 1;
        atualizarTotais();
      }
    });

    inputQuantidade.addEventListener("change", () => {
      let valor = parseInt(inputQuantidade.value);
      if (isNaN(valor) || valor < 1) valor = 1;
      inputQuantidade.value = valor;
      atualizarTotais();
    });

    btnRemover.addEventListener("click", () => {
      item.style.transition = "all 0.4s ease";
      item.style.opacity = "0";
      item.style.transform = "translateX(-20px)";

      setTimeout(() => {
        item.remove();
        if (document.querySelectorAll(".carrinho-item").length === 0) {
          mostrarCarrinhoVazio();
        } else {
          atualizarTotais();
        }
      }, 400);
    });
  });

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

    document.querySelector(".carrinho-itens").remove();
    document.querySelector(".carrinho-resumo").remove();
    container.insertAdjacentHTML("beforeend", vazioHTML);
  }

  const btnFinalizar = document.querySelector(".btn-finalizar");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {
      window.location.href = "pagamento.html";
    });
  }

  atualizarTotais();
});
