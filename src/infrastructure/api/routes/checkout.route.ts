import express, { Request, Response } from "express";
import PlaceOrderUseCaseFactory from "../../../modules/checkout/factory/place-order.usecase.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
  const usecase = PlaceOrderUseCaseFactory.create();
  try {
    const input = {
      clientId: req.body.clientId,
      products: req.body.products,
    };
    const output = await usecase.execute(input);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
