const peticionProductos = () =>
  fetch("http://localhost:3000/productos").then((respuesta) =>
    respuesta.json()
  );
const peticionProducto = (id) =>
  fetch(`http://localhost:3000/productos/${id}`).then((respuesta) =>
    respuesta.json()
  );
const peticionClientes = () =>
  fetch("http://localhost:3000/usuarios").then((respuesta) => respuesta.json());

const borrarProducto = (id) =>
  fetch(`http://localhost:3000/productos/${id}`, {
    method: "DELETE"
  }).then((respuesta) => respuesta.json());

const agregarProducto = (img, nombre, precio, categoria, descripcion) =>
  fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      id: uuid.v4(),
      img: img,
      nombre: nombre,
      precio: precio,
      categoria: categoria,
      descripcion
    })
  }).then((respuesta) => respuesta.json());

const registrarCliente = (nombre, email, password) =>
  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      id: uuid.v4(),
      nombre,
      email,
      password
    })
  });

export const services = {
  peticionProductos,
  peticionClientes,
  borrarProducto,
  agregarProducto,
  registrarCliente,
  peticionProducto
};
