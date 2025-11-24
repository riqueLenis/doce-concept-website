var ul = document.getElementById("ul_pr");
var li = document.querySelectorAll("li");

function add(id){
    // var del_new = document.createElement("button");
    var li_new = document.createElement("li");
    var li_inp = document.createTextNode(id);
    li_new.appendChild(li_inp);
    // li_new.appendChild(document.createTextNode( '\u00A0\u00A0' ) );
    ul.appendChild(li_new);
    // var del_inp = document.createTextNode("Del");
    // del_new.appendChild(del_inp);
    // li_new.appendChild(del_new);
    ul.appendChild(document.createElement("br"));
}

window.emptyList = function () {
    var ul = document.querySelector('#ul_pr');
    var listLength = ul.children.length;
  
    for (i = 0; i < listLength; i++) {
      ul.removeChild(ul.children[0]);
    }
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