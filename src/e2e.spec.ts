import { Sequelize } from "sequelize-typescript";
import request from "supertest";
import { app } from "./infrastructure/api/express";
import { migrator } from "./infrastructure/db/migrations/config/migrator";
import { ProductModel } from "./modules/product-adm/repository/product.model";
import { ClientModel } from "./modules/client-adm/repository/client.model";
import OrderModel from "./modules/checkout/repository/order.model";
import InvoiceModel from "./modules/invoice/repository/invoice.model";
import InvoiceItemModel from "./modules/invoice/repository/invoice-item.model";
import TransactionModel from "./modules/payment/repository/transaction.model";

describe("E2E API Tests", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    
    sequelize.addModels([
      ProductModel,
      ClientModel,
      OrderModel,
      InvoiceModel,
      InvoiceItemModel,
      TransactionModel
    ]);

    const umzug = migrator(sequelize);
    await umzug.up();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("POST /products - should create a product", async () => {
    const response = await request(app).post("/products").send({
      id: "prod-1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    });

    expect(response.status).toBe(201);
  });

  it("POST /clients - should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "client-1",
      name: "Client 1",
      email: "client1@test.com",
      document: "12345678",
      address: {
        street: "Street 1",
        number: "123",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "12345678",
      },
    });

    expect(response.status).toBe(201);
  });

  it("POST /checkout - should place an order", async () => {
    await request(app).post("/products").send({
      id: "prod-2",
      name: "Product 2",
      description: "Product 2 description",
      purchasePrice: 50,
      stock: 20,
    });

    await request(app).post("/clients").send({
      id: "client-2",
      name: "Client 2",
      email: "client2@test.com",
      document: "87654321",
      address: {
        street: "Street 2",
        number: "456",
        city: "City 2",
        state: "State 2",
        zipCode: "87654321",
      },
    });

    const response = await request(app).post("/checkout").send({
      clientId: "client-2",
      products: [{ productId: "prod-2" }],
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("GET /invoice/:id - should get invoice", async () => {
    await request(app).post("/products").send({
      id: "prod-3",
      name: "Product 3",
      description: "Product 3 description",
      purchasePrice: 75,
      stock: 15,
    });

    await request(app).post("/clients").send({
      id: "client-3",
      name: "Client 3",
      email: "client3@test.com",
      document: "11111111",
      address: {
        street: "Street 3",
        number: "789",
        city: "City 3",
        state: "State 3",
        zipCode: "11111111",
      },
    });

    const checkoutResponse = await request(app).post("/checkout").send({
      clientId: "client-3",
      products: [{ productId: "prod-3" }],
    });

    const invoiceId = checkoutResponse.body.invoiceId;
    const response = await request(app).get(`/invoice/${invoiceId}`);
    expect(response.status).toBe(200);
  });
});