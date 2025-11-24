document.addEventListener("DOMContentLoaded", function () {
  const metodoRadios = document.querySelectorAll('input[name="pagamento"]');
  const cartaoDados = document.getElementById("cartaoDados");
  const pixInfo = document.getElementById("pixInfo");
  const btnFinalizar = document.querySelector(".btn-finalizar-pagamento");

  metodoRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "pix") {
        cartaoDados.style.display = "none";
        pixInfo.style.display = "block";
        btnFinalizar.textContent = "Gerar Pix - R$ 1.108,70";
      } else if (radio.value === "boleto") {
        cartaoDados.style.display = "none";
        pixInfo.style.display = "none";
        btnFinalizar.textContent = "Gerar Boleto - R$ 1.108,70";
      } else {
        cartaoDados.style.display = "block";
        pixInfo.style.display = "none";
        btnFinalizar.textContent = "Pagar com Cartão - R$ 1.108,70";
      }
    });
  });

  document.querySelector(".cpf").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = v;
  });

  document.querySelector(".cep").addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, "$1-$2");
    e.target.value = v;
  });

  document
    .getElementById("formCheckout")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Pedido confirmado com sucesso! Obrigado pela compra na Doce Concept!"
      );
    });
});
