import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

clientRoute.get("/", async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();
  try {
    const output = await facade.findAll();
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

clientRoute.post("/", async (req: Request, res: Response) => {
  const facade = ClientAdmFacadeFactory.create();
  try {
    const input = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      address: req.body.address,
    };
    const output = await facade.add(input);
    res.status(201).json(output);
  } catch (err) {
    res.status(500).send(err);
  }
});
