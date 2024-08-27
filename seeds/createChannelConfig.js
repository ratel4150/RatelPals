
import { faker } from "@faker-js/faker";
import models from "../models/index.js";
const {NotificationConfig}= models
export const createChannelConfig = async (channelId) => {
  const channelConfig = new NotificationConfig({
    channel: channelId,
    retries: faker.number.int({ min: 1, max: 5 }),
    sendTime: faker.date.future(),
    expirationTime: faker.date.future(),
    additionalConfig: {
      key1: faker.lorem.word(),
      key2: faker.lorem.word(),
    },
  });

  const savedChannelConfig = await channelConfig.save();
  return savedChannelConfig;
};