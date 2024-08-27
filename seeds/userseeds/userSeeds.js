// En './userseeds/userSeeds.js'

import faker from 'faker';

export default n = {
  model: 'User',
  documents: Array.from({ length: 10 }, () => ({
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  })),
};
