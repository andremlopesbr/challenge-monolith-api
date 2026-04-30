import ClientGateway from "../../gateway/client.gateway";
import { FindAllClientsOutputDto } from "./find-all-clients.dto";

export default class FindAllClientsUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  async execute(): Promise<FindAllClientsOutputDto> {
    const clients = await this._clientRepository.findAll();

    return {
      clients: clients.map((client) => ({
        id: client.id.id,
        name: client.name,
        email: client.email,
        document: client.document,
        address: client.address,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      })),
    };
  }
}
