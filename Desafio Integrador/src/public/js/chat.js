console.log('js chat')
const socket = io()
const divRegister = document.getElementById('registerMessage')
const inputMessage = document.getElementById('message')
const containerMessages = document.getElementById('messages-container')


Swal.fire({
  title: "Ingrese su correo electronico",
  input: "email",
  inputPlaceholder: "Ingrese su email aqui"
})
  .then((res) => {
    try {
      
      if (!res.value) {
        console.log("No se ingresó ningún correo electrónico.");
        return null
    }

    /* enviamos correo */
    Swal.fire(`Entered email: ${res.value}`);
    socket.emit('correoDelUsuario', res.value)
    
    /* recibimos brodcast de nuevo usuario */
    socket.on('conectUser', newUser=>{
      Toastify({
        text: `Se conecto un nuevo usuario: ${newUser}`,   
        duration: 3000 
      }).showToast();              
    })

    divRegister.addEventListener('submit', e =>{
      e.preventDefault()
      let message = inputMessage.value
        console.log(message)
      if(message.trim().length = 0){
        alert('escriba un mensaje')
        return null
      }

      socket.emit('message', {user: res.value, message: message})
      inputMessage.value = ''
    })

    socket.on('newMessage', datos =>{
      console.log(datos + 'estos son los dartos que me hacen el error')
      let newMessage = document.createElement('p')
      newMessage.innerHTML = `<strong>${datos.user}:</strong>
      <p>${datos.message}</p><br>`
      containerMessages.append(newMessage)
      /* mantener abajo el scrool */
      containerMessages.scrollTop=containerMessages.scrollHeight
    })

  } catch (error) {
    return res.status(500).json({ error: error.message})
  }
  })
  