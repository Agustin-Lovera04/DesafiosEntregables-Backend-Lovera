document.addEventListener('DOMContentLoaded', function () {
/* let quantityProd = 1
let divCount = document.getElementById('count')

function actualizarCantidad() {
    divCount.innerHTML = `
    <button id="restar" class="m-3">-</button>
    ${quantityProd}
    <button id="sumar" class="m-3">+</button>
    `;

    const restarBtn = document.getElementById('restar');
    const sumarBtn = document.getElementById('sumar');
    
    restarBtn.addEventListener('click', restarCantidad);
    sumarBtn.addEventListener('click', sumarCantidad);
}

function restarCantidad() {
    if (quantityProd > 1) {
        quantityProd--;
        actualizarCantidad()
    }
}

function sumarCantidad() {
    quantityProd++;
    actualizarCantidad()
}

actualizarCantidad() */

const btnAddToCart = document.getElementById("btnAddToCart");
btnAddToCart.addEventListener("click", async (e) => {
          let productId = e.target.dataset.productId;
          const elementCart = document.getElementById('cartUser');
          const cid = elementCart.getAttribute('cart');

          if (cid) {
            try {
              const response = await fetch(`http://localhost:8080/api/carts/${cid}/product/${productId}`, {
                method: "POST",
/*                 body: quantityProd */
              });
          
              const data = await response.json();
              console.log("Server Response:", data);
          
              resFetch.classList.remove('alert-danger', 'alert-success');
          
              if (data.error) {
                let errorDiv = document.createElement('div');
                errorDiv.classList.add('alert', 'alert-danger');
                errorDiv.innerHTML = `${data.error}`;
          
                resFetch.innerHTML = '';
                resFetch.appendChild(errorDiv);
              } else {
                Toastify({
                  text: `SE AGREGO UN PRODUCTO AL CARRITO CON ID: ${cid}`,
                  duration: 3000,
                }).showToast();
              }
            } catch (error) {
              console.error("error: " + error);
            }
          } else {
            let errorDiv = document.createElement('div');
            errorDiv.classList.add('alert', 'alert-danger');
            errorDiv.innerHTML = `NO PUEDES AGREGAR. ERES ADMINISTRADOR`;
      
            resFetch.innerHTML = '';
            resFetch.appendChild(errorDiv);
          }
          
      });
    })