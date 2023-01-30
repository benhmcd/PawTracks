/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePet = /* GraphQL */ `
  subscription OnCreatePet($filter: ModelSubscriptionPetFilterInput) {
    onCreatePet(filter: $filter) {
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
export const onUpdatePet = /* GraphQL */ `
  subscription OnUpdatePet($filter: ModelSubscriptionPetFilterInput) {
    onUpdatePet(filter: $filter) {
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
export const onDeletePet = /* GraphQL */ `
  subscription OnDeletePet($filter: ModelSubscriptionPetFilterInput) {
    onDeletePet(filter: $filter) {
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
export const onCreateLoginList = /* GraphQL */ `
  subscription OnCreateLoginList(
    $filter: ModelSubscriptionLoginListFilterInput
  ) {
    onCreateLoginList(filter: $filter) {
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
export const onUpdateLoginList = /* GraphQL */ `
  subscription OnUpdateLoginList(
    $filter: ModelSubscriptionLoginListFilterInput
  ) {
    onUpdateLoginList(filter: $filter) {
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
export const onDeleteLoginList = /* GraphQL */ `
  subscription OnDeleteLoginList(
    $filter: ModelSubscriptionLoginListFilterInput
  ) {
    onDeleteLoginList(filter: $filter) {
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
