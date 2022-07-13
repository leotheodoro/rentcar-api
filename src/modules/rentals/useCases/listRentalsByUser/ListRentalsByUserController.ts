import { Request, Response } from "express"
import { container } from "tsyringe"
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase"

class ListRentalsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listsRentalsByUserUseCase = container.resolve(ListRentalsByUserUseCase)

    const { id } = request.user;

    const rentals = await listsRentalsByUserUseCase.execute(id);

    return response.json(rentals)
  }
}

export { ListRentalsByUserController }