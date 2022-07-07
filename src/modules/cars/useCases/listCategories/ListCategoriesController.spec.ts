import { Connection } from "typeorm";
import request from "supertest"
import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid"
import { app } from "@shared/infra/http/app"
import createConnection from "@shared/infra/typeorm"

let connection: Connection;

describe("ListCategoriesController", () => {

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8)

    await connection.query(
      `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
        VALUES('${id}', 'Admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXX')    
      `
    )
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@admin.com",
      password: "admin"
    })
    const { token } = responseToken.body

    await request(app).post("/categories").send({
      name: 'Category Supertest',
      description: 'Category Supertest'
    }).set({
      Authorization: `Bearer ${token}`
    })

    const response = await request(app).get("/categories")

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  })
})