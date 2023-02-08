const axios = require("axios");
let idProductoNuevo;

const newProduct = {
    description: "remera",
    price: 90,
    category: "indumentaria",
    photo: "foto remera",
  };

axios
  .post("/productos?admin=true")
  .send(newProduct)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
/* 

axios
  .get("/productos")
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

axios
  .get(`/productos/${producto.id}`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });


axios
  .put(`/productos/123456?admin=true`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

axios
  .delete(`/productos/${producto.id}?admin=true`)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });
 */