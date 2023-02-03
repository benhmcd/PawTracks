/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPet = /* GraphQL */ `
  mutation CreatePet(
    $input: CreatePetInput!
    $condition: ModelPetConditionInput
  ) {
    createPet(input: $input, condition: $condition) {
      id
      name
      weight
      type
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updatePet = /* GraphQL */ `
  mutation UpdatePet(
    $input: UpdatePetInput!
    $condition: ModelPetConditionInput
  ) {
    updatePet(input: $input, condition: $condition) {
      id
      name
      weight
      type
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deletePet = /* GraphQL */ `
  mutation DeletePet(
    $input: DeletePetInput!
    $condition: ModelPetConditionInput
  ) {
    deletePet(input: $input, condition: $condition) {
      id
      name
      weight
      type
      desc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createLoginList = /* GraphQL */ `
  mutation CreateLoginList(
    $input: CreateLoginListInput!
    $condition: ModelLoginListConditionInput
  ) {
    createLoginList(input: $input, condition: $condition) {
      id
      UID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateLoginList = /* GraphQL */ `
  mutation UpdateLoginList(
    $input: UpdateLoginListInput!
    $condition: ModelLoginListConditionInput
  ) {
    updateLoginList(input: $input, condition: $condition) {
      id
      UID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteLoginList = /* GraphQL */ `
  mutation DeleteLoginList(
    $input: DeleteLoginListInput!
    $condition: ModelLoginListConditionInput
  ) {
    deleteLoginList(input: $input, condition: $condition) {
      id
      UID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
