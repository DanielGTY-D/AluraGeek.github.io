import { services } from "../services/service.cliente.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const inputNombre = document.querySelector("[data-tipo=nombre]");
  const inputEmail = document.querySelector("[data-tipo=email]");
  const inputPassword = document.querySelector("[data-tipo=password]");

  inputNombre.addEventListener("blur", validarInput);
  inputEmail.addEventListener("blur", validarInput);
  inputPassword.addEventListener("blur", validarInput);
  const insertarDatos = (usuario) => {
    if (!Object.values(usuario).includes("")) {
      const { nombre, email, password } = usuario;
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        services.registrarCliente(nombre, email, password);
      });
    }
  };

  const usuario = {
    nombre: "",
    email: "",
    password: ""
  };

  function validarInput(e) {
    const input = e.target;

    if (input.value === "") {
      mostrarMensaje("El campo no puede estar vacio", form);
      return;
    }

    agregarValoresObjeto(input);
  }

  function agregarValoresObjeto(input) {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const regexPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    if (input.name === "nombre") {
      usuario[input.name] = input.value;
    }
    if (input.name === "email" && !regexEmail.test(input.value)) {
      mostrarMensaje("El email no es valido", form);
      input.value = "";
    } else {
      usuario[input.name] = input.value;
    }
    if (
      input.name === "password" &&
      !regexPass.test(input.value) &&
      input.value.length > 8 &&
      input.value.length < 16
    ) {
      mostrarMensaje(
        "La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. Ejemplo: w3Unpocodet0d0",
        form
      );
      input.value = "";
    } else {
      usuario[input.name] = input.value;
    }
    insertarDatos(usuario);
  }

  function mostrarMensaje(texto, referencia) {
    limpiarFormulario(referencia);

    const error = document.createElement("span");
    error.innerText = texto;
    error.classList.add("error2");
    referencia.appendChild(error);

    setTimeout(() => {
      error.remove();
    }, 3000);
  }

  function limpiarFormulario(referencia) {
    while (referencia.lastElementChild.classList.contains("error2")) {
      referencia.removeChild(referencia.lastElementChild);
    }
  }
});
