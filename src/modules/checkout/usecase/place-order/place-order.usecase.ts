import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientGateway from "../../../client-adm/gateway/client.gateway";
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface";
import InvoiceFacadeInterface from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase {
  private _clientGateway: ClientGateway;
  private _catalogFacade: StoreCatalogFacadeInterface;
  private _invoiceFacade: InvoiceFacadeInterface;
  private _paymentFacade: PaymentFacadeInterface;

  constructor(
    clientGateway: ClientGateway,
    catalogFacade: StoreCatalogFacadeInterface,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
  ) {
    this._clientGateway = clientGateway;
    this._catalogFacade = catalogFacade;
    this._invoiceFacade = invoiceFacade;
    this._paymentFacade = paymentFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientGateway.find(input.clientId);
    
    if (!client) {
      throw new Error("Client not found");
    }

    const products = await Promise.all(
      input.products.map(async (p) => {
        const product = await this._catalogFacade.find({ id: p.productId });
        if (!product) {
          throw new Error(`Product ${p.productId} not found`);
        }
        return product;
      })
    );

    const orderId = new Id();
    let total = 0;
    const orderProducts = [];

    for (const product of products) {
      total += product.salesPrice;
      orderProducts.push({
        id: product.id,
        name: product.name,
        price: product.salesPrice,
      });
    }

    const invoiceInput = {
      name: client.name,
      document: client.document,
      street: client.address.street,
      number: client.address.number,
      complement: client.address.complement,
      city: client.address.city,
      state: client.address.state,
      zipCode: client.address.zipCode,
      items: orderProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };

    const invoice = await this._invoiceFacade.generate(invoiceInput);

    const payment = await this._paymentFacade.process({
      orderId: orderId.id,
      amount: total,
    });

    return {
      id: orderId.id,
      invoiceId: invoice.id,
      total: total,
      status: payment.status,
    };
  }
}