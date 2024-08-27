
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {UserRole}= models
export const assignUserRoles = async (userId, roles) => {
  const randomRoles = faker.helpers
    .shuffle(roles)
    .slice(0, faker.number.int({ min: 1, max: roles.length }));

  for (const role of randomRoles) {
    const userRole = new UserRole({
      user: userId,
      role: role._id,
      assignedBy: userId,
    });

    await userRole.save();
  }
};