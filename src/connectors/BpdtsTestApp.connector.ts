import axios from "axios";

const BASE_URL = "https://bpdts-test-app.herokuapp.com";

export const getAllUsers = async () => {
  return axios.get(`${BASE_URL}/users`);
};

export const getUsersInCity = async (city: string) => {
  return axios.get(`${BASE_URL}/city/${city}/users`);
};
