
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {User}= models
export const createUser = async () => {
  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profileImage: faker.image.avatar(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  });
   console.log(user);
  const savedUser = await user.save();
  return savedUser;
};