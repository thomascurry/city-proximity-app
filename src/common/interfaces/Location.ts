import { User } from "./User";

export type Location = Pick<User, "latitude" | "longitude">;
