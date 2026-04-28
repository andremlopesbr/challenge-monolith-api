import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice Use Case unit test", () => {
  it("should generate an invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
      name: "Invoice 1",
      document: "12345",
      street: "Street 1",
      number: "1",
      complement: "Comp 1",
      city: "City 1",
      state: "State 1",
      zipCode: "12345",
      items: [
        { id: "1", name: "Item 1", price: 100 },
        { id: "2", name: "Item 2", price: 200 },
      ],
    };

    const result = await usecase.execute(input);

    expect(repository.create).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.total).toBe(300);
  });
});
