// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const PetType = {
  "DOG": "DOG",
  "CAT": "CAT",
  "BIRD": "BIRD"
};

const { Pet, LoginList } = initSchema(schema);

export {
  Pet,
  LoginList,
  PetType
};