import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { AppError } from "@shared/errors/AppError"
import { CreateCarUseCase } from "./CreateCarUseCase"

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it("should be able to create a new car", async () => {
    const data = {
      name: "Onix",
      description: "Onix 2019",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Chevrolet",
      category_id: "category"
    }

    const car = await createCarUseCase.execute(data);

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a car with existent license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Onix1",
        description: "Onix 2019",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Chevrolet",
        category_id: "category"
      });

      await createCarUseCase.execute({
        name: "Onix2",
        description: "Onix 2019",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Chevrolet",
        category_id: "category"
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it("should be able to create a car with available true by default", async () => {
    const data = {
      name: "Onix Available",
      description: "Onix 2019",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Chevrolet",
      category_id: "category"
    }

    const car = await createCarUseCase.execute(data);

    expect(car.available).toBe(true)
  })
})