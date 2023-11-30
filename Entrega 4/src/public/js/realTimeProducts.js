const socket = io();

const resFetch = document.getElementById('resFetch');
const formAdd = document.getElementById('addProductForm');
formAdd.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('btn click');

    const dataForm = new FormData(formAdd);
    console.log(dataForm.get('title'));

    try {
        fetch('http://localhost:8080/api/products', {
            method: 'POST',
            body: dataForm
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch enviado');
            resFetch.innerHTML = `Producto agregado`;


            formAdd.reset();
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

socket.on('listProd', (products) => {
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
                            ID: ${product.id}
                        </h4>
                    </li>
                </ul>
            </div>
        `;
        containerProd.innerHTML += listMod;
    });
});



/* ------------------DELETE------------------------- */
const deleteForm = document.getElementById('deleteProductForm')
deleteForm.addEventListener('submit', e =>{
    e.preventDefault()
    let deleteID = document.getElementById('deleteID').value
    console.log(deleteID)
    try {
        fetch(`http://localhost:8080/api/products/${deleteID}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('fetch enviado');
            resFetch.innerHTML = 'Producto Eliminado'

            deleteForm.reset();
        });
    } catch (error) {
        console.error('Error:', error);
    }
})
