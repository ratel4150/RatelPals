
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {Notification}= models

export const createNotification = async (
  senderId,
  receiverId,
  notificationTypeId,
  notificationCategoryId,
  channelConfigId
) => {
  const notification = new Notification({
    sender: senderId,
    receiver: receiverId,
    title: faker.lorem.words(5),
    type: notificationTypeId,
    category: notificationCategoryId,
    message: faker.lorem.sentence(),
    link: faker.internet.url(),
    image: faker.image.avatarLegacy(),
    priority: faker.helpers.arrayElement([
      "Low",
      "Normal",
      "High",
      "Critical",
    ]),
    channels: [channelConfigId],
    createdAt: faker.date.past(),
    readAt: faker.date.recent(),
    read: faker.datatype.boolean(),
    additionalInfo: {
      key1: faker.lorem.word(),
      key2: faker.lorem.word(),
    },
    history: [],
  });

  const savedNotification = await notification.save();
  return savedNotification;
};