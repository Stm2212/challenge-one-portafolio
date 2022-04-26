import { validar, habilitarBotonEnviar } from "./validaciones.js";

const inputs = document.querySelectorAll(".input");
const enviar = document.querySelector("[data-submit]");

inputs.forEach((input) => {

    input.addEventListener("blur", (input) => {
        validar(input.target)
    });

    input.addEventListener("keyup", (input) => {    // comprueba despues de ingresar un caracter del teclado

        // if ( tipoDeInput == "nombre"){        // comprueba solo el campo data-tipo="nombre" en cada ingreso de teclado
        //       validar(input.target);
        // }   

        validar(input.target);
        habilitarBotonEnviar(inputs);
    });
});

enviar.addEventListener("click", () => {

    // inputs.forEach((input) => {
    //     validar(input);
    // });

});

