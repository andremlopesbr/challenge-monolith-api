import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import ClientRepository from "../../client-adm/repository/client.repository";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";

export default class PlaceOrderUseCaseFactory {
  static create(): PlaceOrderUseCase {
    const clientRepository = new ClientRepository();
    const catalogFacade = StoreCatalogFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();

    return new PlaceOrderUseCase(
      clientRepository,
      catalogFacade,
      invoiceFacade,
      paymentFacade
    );
  }
}