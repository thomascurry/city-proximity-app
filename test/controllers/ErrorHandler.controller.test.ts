import { NextFunction, Response } from "express";
import { OpenApiRequest } from "express-openapi-validator/dist/framework/types";
import errorHandler from "../../src/controllers/ErrorHandler.controller";

describe("the error handler", () => {
  it("should respond with the supplied error", () => {
    const error: any = new Error("not found");
    error.status = 404;

    const fakeRequest = {} as OpenApiRequest;
    const fakeResponse = {} as Response;

    fakeResponse.status = jest.fn().mockReturnValueOnce(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValueOnce(fakeResponse);

    const fakeNext = jest.fn(() => {}) as NextFunction;

    errorHandler(error, fakeRequest, fakeResponse, fakeNext);
    expect(fakeResponse.status).toHaveBeenCalledWith(404);
    expect(fakeResponse.json).toHaveBeenCalledWith({
      response: "not found",
      status: 404,
    });
  });

  it("should respond with a default error", () => {
    const fakeRequest = {} as OpenApiRequest;
    const fakeResponse = {} as Response;

    fakeResponse.status = jest.fn().mockReturnValueOnce(fakeResponse);
    fakeResponse.json = jest.fn().mockReturnValueOnce(fakeResponse);

    const fakeNext = jest.fn(() => {}) as NextFunction;

    errorHandler({}, fakeRequest, fakeResponse, fakeNext);
    expect(fakeResponse.status).toHaveBeenCalledWith(500);
    expect(fakeResponse.json).toHaveBeenCalledWith({
      response: "An unknown error occurred",
      status: 500,
    });
  });
});
