const socket = io()

const resFetch = document.getElementById('resFetch');
const formAdd = document.getElementById('addProductForm');
formAdd.addEventListener('submit', async (e) => {
    e.preventDefault();


    const dataForm = new FormData(formAdd);


    try {
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: dataForm
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch enviado');
            resFetch.innerHTML += `<p>Producto Agregado</p>`;


            formAdd.reset();
        });
    } catch (error) {
        console.error('Error:', error);
    }
});


socket.on('listProduct', (products) => {
    let containerProd = document.getElementById('container-products');
    containerProd.innerHTML = '';
    products.forEach((product) => {
        const listMod = `
            <div>
                <ul>
                    <li>
                        <h4>
                            ${product.title}
                            code: ${product.code}
                            ID: ${product._id}
                        </h4>
                    </li>
                </ul>
            </div>
        `;
        containerProd.innerHTML += listMod;
    });
});