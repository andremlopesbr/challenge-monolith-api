import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";

export const clientRoute = express.Router();

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
    await facade.add(input);
    res.status(201).send();
  } catch (err) {
    res.status(500).send(err);
  }
});
