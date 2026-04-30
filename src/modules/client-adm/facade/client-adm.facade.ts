import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface, {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  findUsecase?: UseCaseInterface;
  addUsecase: UseCaseInterface;
  findAllUsecase?: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUsecase?: UseCaseInterface;
  private _addUsecase: UseCaseInterface;
  private _findAllUsecase?: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._addUsecase = usecaseProps.addUsecase;
    this._findAllUsecase = usecaseProps.findAllUsecase;
  }

  async add(input: AddClientFacadeInputDto): Promise<any> {
    return await this._addUsecase.execute(input);
  }
  async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUsecase!.execute(input);
  }

  async findAll(): Promise<any> {
    return await this._findAllUsecase!.execute({});
  }
}
