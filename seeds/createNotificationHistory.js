
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {NotificationHistory}= models
export const createNotificationHistory = async (notificationId) => {
  const notificationHistory = new NotificationHistory({
    notification: notificationId,
    action: faker.helpers.arrayElement([
      "Created",
      "Sent",
      "Read",
      "Failed",
    ]),
    timestamp: faker.date.past(),
    details: faker.lorem.sentence(),
  });

  await notificationHistory.save();
  return notificationHistory;
};