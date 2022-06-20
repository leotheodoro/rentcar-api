import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

class CreateCarSpecificationController {
  async handle(request: Request, reponse: Response) {
    const { id } = request.params;
    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase)

    const car = await createCarSpecificationUseCase.execute({ car_id: id, specifications_id })

    return reponse.json(car);
  }
}

export { CreateCarSpecificationController }