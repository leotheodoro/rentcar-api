import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUsecase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUsecase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory)
  })

  it("should not be able to add a new specification to non-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"]

      await createCarSpecificationUsecase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Onix1",
      "description": "Onix 2019",
      "daily_rate": 100,
      "license_plate": "ABC-1213",
      "fine_amount": 60,
      "brand": "Chevrolet",
      "category_id": "category_id"
    })

    const specification = await specificationsRepositoryInMemory.create({ name: "Specification1", description: "Specification description" })

    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUsecase.execute({ car_id: car.id, specifications_id });

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications.length).toBe(1);
  })
})