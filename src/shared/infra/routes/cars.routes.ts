import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express"
import { ensureAuthenticated } from "../http/middlewares/ensureAuthenticated";
import { ensureAdmin } from "../http/middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)

carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }