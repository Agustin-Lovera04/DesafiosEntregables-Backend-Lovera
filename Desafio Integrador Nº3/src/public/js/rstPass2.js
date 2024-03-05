const formRst = document.getElementById("rstPass2")
const pass1 = document.getElementById('pass1')
const pass2 = document.getElementById('pass2')
const token = document.getElementById('token')
const resFetch = document.getElementById("resFetch");

formRst.addEventListener("submit", async (e) => {
    e.preventDefault();
    if(pass1.value !== pass2.value){        
    resFetch.classList.remove('alert-danger', 'alert-success');
    
    let errorDiv = document.createElement('div');
    errorDiv.classList.add('alert', 'alert-danger');
    errorDiv.innerHTML = `COLOQUE CONTRASEÑAS IGUALES`;

    resFetch.innerHTML = '';
    resFetch.appendChild(errorDiv);
    return
    }
    console.log(pass1.value.length);
    if(pass1.value.length <= 2){        
        resFetch.classList.remove('alert-danger', 'alert-success');
        
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger');
        errorDiv.innerHTML = `LA CONTRASEÑA DEBE SER MAYOR A 2 CARACTERES`;
    
        resFetch.innerHTML = '';
        resFetch.appendChild(errorDiv);
        return
        }
        let tokenVal = token.value
        let pass = pass1.value
        console.log(tokenVal)
  try {
    const response = await fetch("http://localhost:8080/api/sessions/restPass3", {
      method: "POST",
    body: pass, tokenVal
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
      console.log("fetch enviado");

      resFetch.classList.add('alert', 'alert-success');

      resFetch.innerHTML = `CONTRASEÑA REESTABLECIDA CON EXITO`;
      formRst.reset();
      setTimeout(() => {
        window.location.href = 'http://localhost:8080/login?message=Contraseña Reestablecida con exito'
      }, "1000");
    }
    } catch (error) {
        console.error("Error in Fetch:", error);

        resFetch.classList.remove('alert-danger', 'alert-success');
    
        let errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger');
        errorDiv.innerHTML = `${error.message}`;
    
        resFetch.innerHTML = '';
        resFetch.appendChild(errorDiv);
}} )
