import { services } from "../services/service.cliente.js";
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-form]");
  const inputRegit = document.querySelector("[data-tipo=registro]");
  inputRegit.addEventListener("click", () => {
    window.location.href = "/screens/registro.html";
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    services.peticionClientes().then((clientes) => {
      verficarInput(clientes, e);
    });
  });

  function verficarInput(clientes, e) {
    const emailCorrecto = clientes.find((cliente) => {
      return (
        cliente.email === e.target.querySelector("[data-input=email]").value
      );
    });
    const passCorrecto = clientes.find((cliente) => {
      return (
        cliente.password ===
        parseInt(e.target.querySelector("[data-input=password]").value)
      );
    });
    if (emailCorrecto === undefined) {
      mosntraMensaje("El correo no es correcto", form);
      return;
    }
    if (passCorrecto === undefined) {
      mosntraMensaje("La contraseña no coincide con el email", form);
      return;
    }

    window.location.href = "/screens/adms-productos.html";
  }

  function mosntraMensaje(mensaje, referencia) {
    limpiarFormulario(referencia);

    const span = document.createElement("span");
    span.textContent = mensaje;
    span.classList.add("error2");
    referencia.appendChild(span);

    setTimeout(() => {
      span.remove();
      referencia.parentElement.querySelector(".label__nombre").hidden = false;
    }, 2500);
  }

  function limpiarFormulario(referencia) {
    while (referencia.lastElementChild.classList.contains("error2")) {
      referencia.removeChild(referencia.lastElementChild);
    }
  }
});
