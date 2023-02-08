const request = require("supertest")("http://localhost:9090");
const expect = require("chai").expect;
let JWT;

const userMaster = {
  email: "prueba@gmail.com",
  password: "123456",
};

const newProduct = {
  description: "remera",
  price: 90,
  category: "indumentaria",
  photo: "foto remera",
};

before(async function () {
  let loginResponse = await request.get("/login").send(userMaster);
  expect(loginResponse.status).to.eql(302);
  JWT = loginResponse.headers["set-cookie"][0]
    .split("; ")
    .find((row) => row.startsWith("connect.sid="))
    ?.split("=")[1];
});

describe("test api productos", async () => {
  describe("GET Productos", async () => {
    it("get productos debe devolver un texto avisando de que se tiene que loguear", async () => {
      let response = await request.get("/productos");
      expect(response.status).to.eql(200);
      expect(response.text).to.equal("Deberas loguearte primero para acceder");
    });
    it("get productos debe devolver la lista de usuarios", async () => {
      let response = await request
        .get("/productos")
        .set("Cookie", [`connect.sid=${JWT}`]);
      expect(response.status).to.eql(200);
      expect(response.body).to.have.lengthOf.greaterThan(0);
    });
  });

  describe("GET Productos by id", async () => {
    it("get productos by id debe devolver un texto avisando de que se tiene que loguear", async () => {
      let response = await request.get(`/productos/123456`);
      expect(response.status).to.eql(200);
      expect(response.text).to.equal("Deberas loguearte primero para acceder");
    });
    it("get productos by id debe devolver el producto", async () => {
      let responseGetProductos = await request
        .get("/productos")
        .set("Cookie", [`connect.sid=${JWT}`]);
      const producto =
        responseGetProductos.body[responseGetProductos.body.length - 1];
      let response = await request
        .get(`/productos/${producto.id}`)
        .set("Cookie", [`connect.sid=${JWT}`]);
      expect(response.body).to.include.keys(
        "id",
        "description",
        "price",
        "category",
        "photo"
      );
    });
  });

  describe("POST addProduct", async () => {
    it("add productos debe devolver un texto avisando de que se tiene que loguear", async () => {
      let response = await request.post(`/productos`).send(newProduct);
      expect(response.status).to.eql(200);
      expect(response.text).to.equal("Deberas loguearte primero para acceder");
    });
    it("add productos debe crear el producto", async () => {
      let responsePostProductos = await request
        .post("/productos?admin=true")
        .send(newProduct)
        .set("Cookie", [`connect.sid=${JWT}`]);
      expect(responsePostProductos.body).to.include.keys(
        "_id",
        "description",
        "price",
        "category",
        "photo"
      );
    });
  });

  describe("PUT updateProductById", async () => {
    it("updateProductById debe devolver un texto avisando de que se tiene que loguear", async () => {
      let response = await request
        .put(`/productos/123456?admin=true`)
        .send({ category: "category modificacion2" });
      expect(response.status).to.eql(200);
      expect(response.text).to.equal("Deberas loguearte primero para acceder");
    });
    it("updateProductById debe editar el producto", async () => {
      let responseGetProductos = await request
        .get("/productos")
        .set("Cookie", [`connect.sid=${JWT}`]);
      const producto =
        responseGetProductos.body[responseGetProductos.body.length - 1];
      let responsePutProductos = await request
        .put(`/productos/${producto.id}?admin=true`)
        .send({ category: "category modificacion2" })
        .set("Cookie", [`connect.sid=${JWT}`]);
      expect(responsePutProductos.body).to.include.keys(
        "_id",
        "description",
        "price",
        "category",
        "photo"
      );
    });
  });

  describe("DELETE updateProductById", async () => {
    it("updateProductById debe devolver un texto avisando de que se tiene que loguear", async () => {
      let response = await request.delete(`/productos/123456?admin=true`);
      expect(response.status).to.eql(200);
      expect(response.text).to.equal("Deberas loguearte primero para acceder");
    });
    it("updateProductById debe editar el producto", async () => {
      let responseGetProductos = await request
        .get("/productos")
        .set("Cookie", [`connect.sid=${JWT}`]);
      const producto =
        responseGetProductos.body[responseGetProductos.body.length - 1];
      let responseDeleteProductos = await request
        .delete(`/productos/${producto.id}?admin=true`)
        .set("Cookie", [`connect.sid=${JWT}`]);
      expect(responseDeleteProductos.body.deletedCount).to.equal(1);
    });
  });
});
