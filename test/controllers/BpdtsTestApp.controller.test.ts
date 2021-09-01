import { NextFunction, Response } from "express";
import { OpenApiRequest } from "express-openapi-validator/dist/framework/types";
import { usersInRadius } from "../../src/controllers/BpdtsTestApp.controller";
import * as service from "../../src/services/BpdtsTestApp.service";
import { mocked } from "ts-jest/utils";
import { AxiosResponse } from "axios";

const mockService = mocked(service, true);

jest.mock("../../src/services/BpdtsTestApp.service");

const fakeData = [
  {
    id: 657,
    first_name: "Stephen",
    last_name: "Mapstone",
    email: "smapstonei8@bandcamp.com",
    ip_address: "186.79.141.124",
    latitude: -8.1844859,
    longitude: 113.6680747,
  },
];

afterEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe("usersInRadius", () => {
  it("should return all the users within the supplied radius", async () => {
    const fakeRequest = {
      openapi: {
        pathParams: {
          city: "london",
        },
      },
    } as unknown as OpenApiRequest;

    const fakeResponse = {} as Response;

    fakeResponse.status = jest.fn().mockReturnValueOnce(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValueOnce(fakeResponse);

    const fakeNext = {} as unknown as NextFunction;

    mockService.getLocationOfCity.mockReturnValueOnce({
      latitude: 1.0,
      longitude: 1.0,
    });

    mockService.usersInCity.mockResolvedValueOnce({
      data: fakeData,
    } as unknown as AxiosResponse);

    mockService.usersInRadius.mockResolvedValueOnce(fakeData);

    await usersInRadius(fakeRequest, fakeResponse, fakeNext);

    expect(fakeResponse.status).toHaveBeenCalledWith(200);
    expect(fakeResponse.json).toHaveBeenCalledWith({
      users: fakeData,
    });
  });

  it("should pass a not found error when the location doesnt exist in the dataset", async () => {
    const fakeRequest = {
      openapi: {
        pathParams: {
          city: "unknown",
        },
      },
    } as unknown as OpenApiRequest;

    const fakeResponse = {} as Response;

    fakeResponse.status = jest.fn().mockReturnValueOnce(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValueOnce(fakeResponse);

    const fakeNext = jest.fn(() => {}) as unknown as NextFunction;

    mockService.getLocationOfCity.mockReturnValueOnce(undefined);

    mockService.usersInCity.mockResolvedValueOnce({
      data: fakeData,
    } as unknown as AxiosResponse);

    mockService.usersInRadius.mockResolvedValueOnce(fakeData);

    await usersInRadius(fakeRequest, fakeResponse, fakeNext);

    const expectedError = new Error("location not found in dataset");

    expect(fakeNext).toHaveBeenCalledWith(expectedError);
  });

  it("should pass an error thrown by the service", async () => {
    const fakeRequest = {
      openapi: {
        pathParams: {
          city: "unknown",
        },
      },
    } as unknown as OpenApiRequest;

    const fakeResponse = {} as Response;

    fakeResponse.status = jest.fn().mockReturnValueOnce(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValueOnce(fakeResponse);

    const fakeNext = jest.fn(() => {}) as unknown as NextFunction;

    mockService.getLocationOfCity.mockReturnValueOnce({
      latitude: 1.0,
      longitude: 1.0,
    });

    mockService.usersInCity.mockResolvedValueOnce({
      data: fakeData,
    } as unknown as AxiosResponse);

    mockService.usersInRadius.mockRejectedValueOnce(
      new Error("it didnt work!")
    );

    await usersInRadius(fakeRequest, fakeResponse, fakeNext);

    const expectedError = new Error("it didnt work!");

    expect(fakeNext).toHaveBeenCalledWith(expectedError);
  });
});
