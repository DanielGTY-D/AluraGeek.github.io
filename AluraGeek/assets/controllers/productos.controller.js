import { services } from "../services/service.cliente.js";
document.addEventListener("DOMContentLoaded", () => {
  const productoLista = document.querySelectorAll(".lista__productos");
  const crearProducto = (img, nombre, precio, referencia, id) => {
    const producto = document.createElement("li");

    const imgProducto = document.createElement("img");
    imgProducto.classList.add("producto__img");
    crearImgProducto(img, referencia, imgProducto);

    const contenido = document.createElement("div");
    contenido.classList.add("contenido__prod", "bg-color");
    contenido.innerHTML = `
    <h4 class="contenido__titulo">${nombre}</h4>
    <p class="contenido__precio">$${precio}</p>
    <a href="../screens/producto.html?id=${id}" class="btn" id=${id}>Ver producto</a>
    `;

    producto.appendChild(imgProducto);
    producto.appendChild(contenido);

    productoLista.forEach((intem) => {
      if (intem.dataset.tipo === referencia) {
        intem.appendChild(producto);
      }
    });
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

  services.peticionProductos().then((datos) => {
    datos.forEach((producto) => {
      const { nombre, precio, img, categoria, id } = producto;
      crearProducto(img, nombre, precio, categoria, id);
    });
  });
});
