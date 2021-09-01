import * as connector from "../connectors/BpdtsTestApp.connector";
import GeoPoint from "geopoint";
import { Location } from "src/common/interfaces/Location";
import { AxiosResponse } from "axios";
import { User } from "src/common/interfaces/User";
import { LOCATIONS } from "../common/constants/locations";

export const usersInRadius = async (
  location: Location,
  radius: number
): Promise<User[]> => {
  const users: AxiosResponse<User[]> = await connector.getAllUsers();

  const usersWithinRadius: User[] = users.data.filter((user: User) => {
    const { latitude, longitude } = user;
    const userLocation: Location = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };
    return distanceBetweenLocations(location, userLocation) <= radius;
  });

  return usersWithinRadius;
};

export const usersInCity = async (
  city: string
): Promise<AxiosResponse<User[]>> => {
  const [firstLetter, ...rest] = city.toLowerCase();
  const capitalizedCity = firstLetter.toUpperCase() + rest.join("");
  console.log(capitalizedCity);
  return connector.getUsersInCity(capitalizedCity);
};

export const getLocationOfCity = (city: string): Location | undefined => {
  return LOCATIONS[city.toLowerCase()];
};

export const distanceBetweenLocations = (
  firstLocation: Location,
  secondLocation: Location
) => {
  const firstPoint: GeoPoint = new GeoPoint(
    firstLocation.latitude,
    firstLocation.longitude
  );
  const secondPoint: GeoPoint = new GeoPoint(
    secondLocation.latitude,
    secondLocation.longitude
  );

  return firstPoint.distanceTo(secondPoint, false);
};
