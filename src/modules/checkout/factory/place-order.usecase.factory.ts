import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import ClientRepository from "../../client-adm/repository/client.repository";
import ProductRepository from "../../product-adm/repository/product.repository";
import InvoiceRepository from "../../invoice/repository/invoice.repository";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";

export default class PlaceOrderUseCaseFactory {
  static create(): PlaceOrderUseCase {
    const clientRepository = new ClientRepository();
    const productRepository = new ProductRepository();
    const invoiceRepository = new InvoiceRepository();
    const paymentFacade = PaymentFacadeFactory.create();

    return new PlaceOrderUseCase(
      clientRepository,
      productRepository,
      invoiceRepository,
      paymentFacade
    );
  }
}