import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const facade = StoreCatalogFacadeFactory.create();
  try {
    const output = await facade.findAll();
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.post("/", async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();
  try {
    const input = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      salesPrice: req.body.salesPrice || req.body.purchasePrice,
      stock: req.body.stock,
    };
    const output = await facade.addProduct(input);
    res.status(201).json(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
