import { services } from "../services/service.cliente.js";
document.addEventListener("DOMContentLoaded", () => {
  const productoLista = document.querySelectorAll(".lista__productos");
  const crearProducto = (img, nombre, precio, referencia, id) => {
    const producto = document.createElement("li");
    const imgProducto = document.createElement("img");
    crearImgProducto(img, referencia, imgProducto);
    imgProducto.classList.add("producto__img");
    const contenido = document.createElement("div");
    contenido.setAttribute("id", `${id}`);
    contenido.classList.add("contenido", "bg-color");
    contenido.innerHTML = `
    <h4 class="contenido__titulo">${nombre}</h4>
    <p class="contenido__precio">$${precio}</p>
    <div class="d-flex borrar">
      <a class="btn">Ver producto</a>
      <a class="btn eliminar">Eliminar Producto</a>
    </div>
    `;
    producto.appendChild(imgProducto);
    producto.appendChild(contenido);

    productoLista.forEach((intem) => {
      if (intem.dataset.tipo === referencia) {
        intem.appendChild(producto);
      }
    });

    eliminarProdcuto(producto, id);
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
      const { id, nombre, precio, img, categoria } = producto;
      crearProducto(img, nombre, precio, categoria, id);
    });
  });

  function eliminarProdcuto(producto, id) {
    producto.addEventListener("click", (e) => {
      const btn = e.target.classList.contains("eliminar");

      if (btn) {
        services.borrarProducto(id).then((datos) => console.log(datos));
      }
    });
  }
});
