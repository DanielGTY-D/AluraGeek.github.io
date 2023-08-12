import { services } from "../services/service.cliente.js";
document.addEventListener("DOMContentLoaded", () => {
  const productoSect = document.querySelector("[data-sect=producto]");
  const listadoProductos = document.querySelector(
    "[data-sect=listadoProductos]"
  );
  const url = new URL(window.location);
  const idUrl = url.searchParams.get("id");
  const productoContenid = (img, nombre, precio, descripción, referencia) => {
    const div = document.createElement("div");
    div.classList.add("d-flex", "d-flex__producto", "container", "producto");
    const imgProducto = document.createElement("img");
    imgProducto.classList.add("producto__img--alt");
    crearImgProducto(img, referencia, imgProducto);
    const producto = `
          <div>
              <h3>${nombre}</h3>
              <p>${precio}</p>
              <p>${descripción}</p>
          </div>
        `;
    div.innerHTML = producto;
    div.appendChild(imgProducto);
    productoSect.appendChild(div);
  };

  const productosSimilares = (img, nombre, precio, id, referencia) => {
    const producto = document.createElement("li");
    producto.classList.add("productoLi");
    const imgProducto = document.createElement("img");
    crearImgProducto(img, referencia, imgProducto);
    imgProducto.classList.add("producto__img--similares");
    const contenido = document.createElement("div");
    contenido.setAttribute("id", `${id}`);
    contenido.classList.add("contenido__prod", "bg-color");
    contenido.innerHTML = `
    <h4 class="contenido__titulo--prod">${nombre}</h4>
    <p class="contenido__precio">$${precio}</p>
    <div class="d-flex borrar">
      <a href="../screens/producto.html?id=${id}" class="btn">Ver producto</a>
    </div>
    `;
    producto.appendChild(imgProducto);
    producto.appendChild(contenido);
    listadoProductos.appendChild(producto);
  };

  function crearImgProducto(img, referencia, imgProducto) {
    const regexUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

    if (regexUrl.test(img)) {
      imgProducto.setAttribute("src", `${img}.png`, "alt", "imagen producto");
      return imgProducto;
    }
    imgProducto.setAttribute(
      "src",
      `/assets/img/${referencia}/${img}.png`,
      "alt",
      "imagen producto"
    );
    return imgProducto;
  }

  services.peticionProducto(idUrl).then((datos) => {
    const { img, nombre, precio, descripcion, categoria } = datos;
    console.log(datos);
    productoContenid(img, nombre, precio, descripcion, categoria);
  });

  services.peticionProductos().then((datos) => {
    let i = 0;
    while (i < datos.length) {
      if (i >= 5) {
        break;
      }
      const { img, nombre, precio, id, categoria } = datos[i];
      productosSimilares(img, nombre, precio, id, categoria);
      i++;
    }
  });
});
