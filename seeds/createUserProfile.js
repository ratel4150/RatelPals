
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {UserProfile}= models
export const createUserProfile = async (userId) => {
  const userProfile = new UserProfile({
    user: userId,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    fullName: faker.person.fullName(),
    dateOfBirth: faker.date.past(),
    gender: faker.helpers.arrayElement(["Male", "Female", "Other"]),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      zipCode: faker.location.zipCode(),
    },
    phoneNumbers: [faker.phone.number()],
    interests: [faker.word.words(), faker.word.words()],
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    status: faker.helpers.arrayElement([
      "PendingVerification",
      "Active",
      "Inactive",
      "Complete Profile",
      "Incomplete Profile",
      "Available for Service",
      "Not Available for Service",
      "Pending Interview",
      "Pending Job Assignment",
      "Assigned Job",
      "Job Completed",
      "Pending Payment",
      "Payment Received",
      "Vehicle Maintenance",
      "On Break",
      "On Duty",
      "Off Duty",
    ]),
  });

  await userProfile.save();
};