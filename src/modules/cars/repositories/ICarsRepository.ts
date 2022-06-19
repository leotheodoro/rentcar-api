import { ICreateCarDTO } from "../dtos/ICarCreateDTO"

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>
}

export { ICarsRepository }