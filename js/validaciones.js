

export const validar = (input) => {
    const tipoDeInput = (input.dataset.tipo);
    
    // para que input.validity.valid sea true (input.validity.valid=true) hay que setear setCustomValidity("")
    // con string vacío ""      
    
    if (validadores[tipoDeInput]) {        //  validador usando validadores personalizados junto con setCustomValidity().
        validadores[tipoDeInput](input);   //   si setCustomValidity("") manda algun string porque existe un error
    }                                       // input.validity.valid va a ser FALSE, hasta que se arregle el error 
                                            
    if (input.validity.valid) {
        
        input.parentElement.querySelector(".message-error").innerHTML = "";
        input.parentElement.classList.remove("input__invalid");

    } else {
        
        input.parentElement.classList.add("input__invalid");             
        let mensajeDeError = mostrarMensajeDeError(input, tipoDeInput);  // => validador usando mensajes personalizados
        input.parentElement.querySelector(".message-error").innerHTML = mensajeDeError;
        
    }
}

        // validacion del formulario completo, se habilita si todos los campos estan llenos
export const habilitarBotonEnviar = (inputs) => {
    const boton_submit = document.querySelector("[data-submit]");

    let esValido = true;
    let i = 0;
    while ((esValido) && (i < inputs.length)) {
        if (inputs[i].validity.valueMissing){
            esValido = false;
        }
        i++;
    }

    if (esValido) {
        boton_submit.classList.add("form__boton-enviar--enabled");
        boton_submit.disabled = false;
    } else {
        boton_submit.classList.remove("form__boton-enviar--enabled");
        boton_submit.disabled = true;
    }
}

const validadores = {
    nombre: (input) => validarNombre(input),
    email: (input) => validarEmail(input),
    asunto: (input) => validarAsunto(input),
    mensaje: (input) => validarMensaje(input)
}


//  este validadorNombre muestra un mensaje de error personalizado en el tooltip del navegador

const validarNombre = (input) => {
    //  para que input.checkValidity() no arroje un false y compruebe si es valido
    //  el campo primero hay que setear el setCustomValidity("") en vacío, string vacío.                 
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El nombre tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50){
            mensaje = "El nombre tiene que tener menos de 50 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}
 
const validarEmail = (input) => {
    const regEx= /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/;
    let mensaje = "";
    if ( !regEx.test(input.value) ){
        mensaje = "El E-mail es incorrecto";    
    }
    input.setCustomValidity(mensaje);     // si el mensaje no llega vacío, setCustomValidity pone a customError en true
                                        // si  llega vacío (""), setCustomValidity pone a customError en false
}
    
const validarAsunto = (input) => {      //  IIFE (Immediately Invoked Function Expression)
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 3) {
        mensaje = "El asunto tiene que tener al menos 3 caracteres."
    } else {
        if (texto.length > 50){
            mensaje = "El asunto tiene que tener menos de 50 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}

const validarMensaje = (input) => {
    let mensaje = "";
    let texto = input.value.trim();

    if (texto.length < 10) {
        mensaje = "El mensaje tiene que tener al menos 10 caracteres."
    } else {
        if (texto.length > 300){
            mensaje = "El mensaje tiene que tener menos de 300 caracteres."
        }
    }    
    input.setCustomValidity(mensaje);
}



const tipoDeErrores = [     // vector con los tipos de errores que pueden ocurrir
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "tooLong",
    "tooShort",
    "customError"       //  customError es true cuando setCustomValidity tiene un valor distinto de string vacio "" .
];                      //  si setCustomValidity("") retorna false.

const mensajeDeErrores = {
    nombre: {
        valueMissing: "Ingrese su nombre. ",
        // tooLong: "El nombre no puede tener mas de 50 caracteres. ",
        // tooShort: "El nombre tiene que tener al menos 3 caracteres.",
        customError: "El nombre tiene que tener entre 3 y 50 caracteres."
    },
    email: {
        valueMissing: "Ingrese su e-mail.",
        patternMismatch: "El e-mail no es correcto.",
        typeMismatch: "",
        customError: ""
    },
    asunto: {
        valueMissing: "Ingrese su asunto. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "El asunto tiene que tener entre 3 y 50 caracteres.",
    },
    mensaje: {
        valueMissing: "Ingrese su asunto. ",
        // tooLong: "El asunto no puede tener mas de 50 caracteres. ",
        // tooShort: "El asunto tiene que tener al menos 3 caracteres.",
        customError: "El mensaje tiene que tener entre 10 y 300 caracteres.",
    }
}

function mostrarMensajeDeError(input, tipoDeInput) {
    let mensajes = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            //console.log(mensajeDeErrores[tipoDeInput][error]);
            mensajes += mensajeDeErrores[tipoDeInput][error];   
        }
    });
    return mensajes;

}




