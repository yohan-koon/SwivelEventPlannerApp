import { UserRegistrationStoreModel } from "./UserRegistrationStore"

test("can be created", () => {
  const instance = UserRegistrationStoreModel.create({})

  expect(instance).toBeTruthy()
})
