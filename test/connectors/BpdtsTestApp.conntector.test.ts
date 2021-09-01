import * as connector from "../../src/connectors/BpdtsTestApp.connector";
import { User } from "../../src/common/interfaces/User";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

afterEach(() => {
  jest.clearAllMocks();
});
describe("the test app connector", () => {
  it("should call the endpoint that retrieves all users and return them", async () => {
    const fakeUsers: User[] = [
      {
        id: 658,
        first_name: "Stephen",
        last_name: "Mapstone",
        email: "smapstonei9@bandcamp.com",
        ip_address: "187.79.141.124",
        latitude: -8.1844859,
        longitude: 113.6680747,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce(fakeUsers);

    const result = await connector.getAllUsers();

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://bpdts-test-app.herokuapp.com/users"
    );

    expect(result).toEqual(fakeUsers);
  });

  it("should call the endpoint that retrieves all the users within a city and returns them", async () => {
    const fakeUsers: User[] = [
      {
        id: 658,
        first_name: "Stephen",
        last_name: "Mapstone",
        email: "smapstonei9@bandcamp.com",
        ip_address: "187.79.141.124",
        latitude: -8.1844859,
        longitude: 113.6680747,
      },
    ];

    mockedAxios.get.mockResolvedValueOnce(fakeUsers);

    const result = await connector.getUsersInCity("London");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://bpdts-test-app.herokuapp.com/city/London/users"
    );

    expect(result).toEqual(fakeUsers);
  });
});
