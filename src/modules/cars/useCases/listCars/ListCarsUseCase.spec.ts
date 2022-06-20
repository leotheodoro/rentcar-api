import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Onix1",
      "description": "Onix 2019",
      "daily_rate": 100,
      "license_plate": "ABC-1213",
      "fine_amount": 60,
      "brand": "Chevrolet",
      "category_id": "category_id"
    })

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Onix2",
      "description": "Onix 2019",
      "daily_rate": 100,
      "license_plate": "ABC-1213",
      "fine_amount": 60,
      "brand": "Chevrolet_test",
      "category_id": "category_id"
    })

    const cars = await listCarsUseCase.execute({
      brand: "Chevrolet_test"
    });

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Onix3",
      "description": "Onix 2019",
      "daily_rate": 100,
      "license_plate": "ABC-1213",
      "fine_amount": 60,
      "brand": "Chevrolet_test",
      "category_id": "category_id"
    })

    const cars = await listCarsUseCase.execute({
      name: "Onix3"
    });

    expect(cars).toEqual([car]);
  })

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Onix3",
      "description": "Onix 2019",
      "daily_rate": 100,
      "license_plate": "ABC-1213",
      "fine_amount": 60,
      "brand": "Chevrolet_test",
      "category_id": "category_id_1"
    })

    const cars = await listCarsUseCase.execute({
      category_id: "category_id_1"
    });

    expect(cars).toEqual([car]);
  })
})