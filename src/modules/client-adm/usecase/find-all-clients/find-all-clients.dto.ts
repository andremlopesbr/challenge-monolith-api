import Address from "../../../@shared/domain/value-object/address";

export interface FindAllClientsOutputDto {
  clients: {
    id: string;
    name: string;
    email: string;
    document: string;
    address: Address;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
