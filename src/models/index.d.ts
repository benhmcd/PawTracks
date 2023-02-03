import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";

export enum PetType {
  DOG = "DOG",
  CAT = "CAT",
  BIRD = "BIRD"
}



type EagerPet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly weight: number;
  readonly age: number;
  readonly type: PetType | keyof typeof PetType;
  readonly breed: string;
  readonly desc?: string | null;
  readonly img?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPet = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Pet, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly weight: number;
  readonly age: number;
  readonly type: PetType | keyof typeof PetType;
  readonly breed: string;
  readonly desc?: string | null;
  readonly img?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Pet = LazyLoading extends LazyLoadingDisabled ? EagerPet : LazyPet

export declare const Pet: (new (init: ModelInit<Pet>) => Pet) & {
  copyOf(source: Pet, mutator: (draft: MutableModel<Pet>) => MutableModel<Pet> | void): Pet;
}

type EagerLoginList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoginList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly UID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLoginList = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<LoginList, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly UID?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type LoginList = LazyLoading extends LazyLoadingDisabled ? EagerLoginList : LazyLoginList

export declare const LoginList: (new (init: ModelInit<LoginList>) => LoginList) & {
  copyOf(source: LoginList, mutator: (draft: MutableModel<LoginList>) => MutableModel<LoginList> | void): LoginList;
}