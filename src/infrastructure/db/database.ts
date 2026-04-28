import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import InvoiceItemModel from "../../modules/invoice/repository/invoice-item.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";

let _sequelize: Sequelize | null = null;

export async function initializeDatabase(): Promise<Sequelize> {
  if (!_sequelize) {
    _sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    });
    await _sequelize.addModels([
      ProductModel, 
      ClientModel, 
      OrderModel, 
      InvoiceModel, 
      InvoiceItemModel,
      TransactionModel
    ]);
    await _sequelize.sync({ force: true });
  }
  return _sequelize;
}

export function getSequelize(): Sequelize | null {
  return _sequelize;
}