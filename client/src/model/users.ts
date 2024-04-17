import { rest } from "./myFetch";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  address: Address;
}

export interface Address {
  address: string;
  city: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  postalCode: string;
  state: string;
}

export async function getUsers(): Promise<User[]> {
  const data = await rest("http://localhost:3000/api/v1/users");
  return data.data;
}
