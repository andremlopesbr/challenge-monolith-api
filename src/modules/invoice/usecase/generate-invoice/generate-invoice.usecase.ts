import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate-invoice.dto";
import Invoice from "../../domain/invoice.entity";
import Address from "../../domain/address.value-object";
import InvoiceItem from "../../domain/invoice-item.entity";

export default class GenerateInvoiceUseCase {
  constructor(private readonly invoiceGateway: InvoiceGateway) {}

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const props = {
      name: input.name,
      document: input.document,
      address: new Address(
        input.street,
        input.number,
        input.complement,
        input.city,
        input.state,
        input.zipCode
      ),
      items: input.items.map(
        (item) =>
          new InvoiceItem({
            name: item.name,
            price: item.price,
          })
      ),
    };

    const invoice = new Invoice(props);
    await this.invoiceGateway.create(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: invoice.total,
    };
  }
}
