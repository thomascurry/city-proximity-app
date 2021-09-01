import * as connector from "../../src/connectors/BpdtsTestApp.connector";
import { mocked } from "ts-jest/utils";
import { AxiosResponse } from "axios";
import * as service from "../../src/services/BpdtsTestApp.service";

const mockedConnector = mocked(connector, true);

jest.mock("../../src/connectors/BpdtsTestApp.connector");

const fakeData = {
  data: [
    {
      id: 657,
      first_name: "Stephen",
      last_name: "Mapstone",
      email: "smapstonei8@bandcamp.com",
      ip_address: "186.79.141.124",
      latitude: -8.1844859,
      longitude: 113.6680747,
    },
  ],
} as unknown as AxiosResponse;

describe("the test app service", () => {
  describe("usersInRadius", () => {
    it("should return all of the users within the supplied radius", async () => {
      mockedConnector.getAllUsers.mockResolvedValueOnce(fakeData);

      const result = await service.usersInRadius(
        { latitude: -8.0, longitude: 113 },
        50
      );
      expect(connector.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(fakeData.data);
    });
    it("should return all of the users within the supplied radius even if the supplied latitude and longitude is a string", async () => {
      mockedConnector.getAllUsers.mockResolvedValueOnce({
        data: [
          {
            id: 658,
            first_name: "Stephen",
            last_name: "Mapstone",
            email: "smapstonei9@bandcamp.com",
            ip_address: "187.79.141.124",
            latitude: "-8.1844859",
            longitude: "113.6680747",
          },
        ],
      } as unknown as AxiosResponse);

      const result = await service.usersInRadius(
        { latitude: -8.0, longitude: 113 },
        50
      );
      expect(connector.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual([
        {
          id: 658,
          first_name: "Stephen",
          last_name: "Mapstone",
          email: "smapstonei9@bandcamp.com",
          ip_address: "187.79.141.124",
          latitude: "-8.1844859",
          longitude: "113.6680747",
        },
      ]);
    });

    describe("usersInCity", () => {
      it("should return the result of the connector.getUsersInCity call", async () => {
        mockedConnector.getUsersInCity.mockResolvedValueOnce(fakeData);

        const result = await service.usersInCity("London");
        expect(mockedConnector.getUsersInCity).toHaveBeenCalledWith("London");
        expect(result).toEqual(fakeData);
      });
      it("should capitalize the city name correctly before calling the connector", async () => {
        mockedConnector.getUsersInCity.mockResolvedValueOnce(fakeData);

        await service.usersInCity("lOnDoN");
        expect(mockedConnector.getUsersInCity).toHaveBeenCalledWith("London");
      });
    });

    describe("getLocationOfCity", () => {
      it("should return the Location of a city if it exists in the data set", () => {
        expect(service.getLocationOfCity("london")).toEqual({
          latitude: 51.509865,
          longitude: -0.118092,
        });
      });
      it("should pass the city name as lower case regardless of input", () => {
        expect(service.getLocationOfCity("LONDON")).toEqual({
          latitude: 51.509865,
          longitude: -0.118092,
        });
      });
      it("should return undefined if the city does not exist in the dataset", () => {
        expect(service.getLocationOfCity("Newcastle")).toBeUndefined();
      });
    });
  });

  describe("distanceBetweenLocations", () => {
    it("should return the distance between two locations", () => {
      const firstLocation = {
        latitude: 1.0,
        longitude: 1.0,
      };

      const secondLocation = {
        latitude: 1.1,
        longitude: 1.1,
      };

      expect(
        service.distanceBetweenLocations(firstLocation, secondLocation)
      ).toEqual(9.770465980422069);
    });
  });
});
