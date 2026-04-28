import Id from "../../../@shared/domain/value-object/id.value-object";
import ClientGateway from "../../../client-adm/gateway/client.gateway";
import ProductGateway from "../../../product-adm/gateway/product.gateway";
import Invoice from "../../../invoice/domain/invoice.entity";
import InvoiceItem from "../../../invoice/domain/invoice-item.entity";
import InvoiceGateway from "../../../invoice/gateway/invoice.gateway";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase {
  private _clientGateway: ClientGateway;
  private _productGateway: ProductGateway;
  private _invoiceGateway: InvoiceGateway;
  private _paymentFacade: PaymentFacadeInterface;

  constructor(
    clientGateway: ClientGateway,
    productGateway: ProductGateway,
    invoiceGateway: InvoiceGateway,
    paymentFacade: PaymentFacadeInterface
  ) {
    this._clientGateway = clientGateway;
    this._productGateway = productGateway;
    this._invoiceGateway = invoiceGateway;
    this._paymentFacade = paymentFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const client = await this._clientGateway.find(input.clientId);
    
    if (!client) {
      throw new Error("Client not found");
    }

    const products = await Promise.all(
      input.products.map(async (p) => {
        const product = await this._productGateway.find(p.productId);
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
      total += product.purchasePrice;
      orderProducts.push({
        id: product.id.id,
        name: product.name,
        price: product.purchasePrice,
      });
    }

    const invoice = new Invoice({
      id: orderId,
      name: client.name,
      document: client.document,
      address: client.address,
      items: orderProducts.map((p) => new InvoiceItem({
        id: new Id(p.id),
        name: p.name,
        price: p.price,
      })),
    });

    await this._invoiceGateway.create(invoice);

    const payment = await this._paymentFacade.process({
      orderId: orderId.id,
      amount: total,
    });

    return {
      id: orderId.id,
      invoiceId: invoice.id.id,
      total: total,
      status: payment.status,
    };
  }
}