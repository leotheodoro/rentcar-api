import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express"
import { ensureAuthenticated } from "../http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../http/middlewares/ensureAdmin";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

export { carsRoutes }