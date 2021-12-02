// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }else{
                    RegistrarPersona();
                    event.preventDefault()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()

function RegistrarPersona(){
    //alert('Todo esta correctamente');
    let nombres = document.querySelector('#txtNombres').value;
    let apellidos = document.querySelector('#txtApellidos').value;
    let tipoDocumento = document.querySelector('#txtTipoDocumento').value;
    let documento = document.querySelector('#txtDocumento').value;
    let correo = document.querySelector('#txtCorreo').value;
    let celular = document.querySelector('#txtCelular').value;

    let url = `http://localhost:3000/dueno-mascotas`;
    let datos = {
        Mombres: nombres,
        Apellidos: apellidos,
        TipoDocumento: tipoDocumento,
        Documento: documento,
        Celular: celular,
        Correo: correo 
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .then(mensaje => {
        console.log(mensaje)
    })
}