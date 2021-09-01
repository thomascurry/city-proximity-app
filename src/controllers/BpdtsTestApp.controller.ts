import { NextFunction, Response } from "express";
import { User } from "src/common/interfaces/User";
import * as testAppService from "../services/BpdtsTestApp.service";
import _ from "lodash";
import { OpenApiRequest } from "express-openapi-validator/dist/framework/types";
import { Location } from "src/common/interfaces/Location";

export const usersInRadius = async (
  req: OpenApiRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const city: string = req.openapi?.pathParams?.city!;
    const location: Location | undefined =
      testAppService.getLocationOfCity(city);

    if (!location) {
      const error: any = new Error("location not found in dataset");
      error.status = 404;
      return next(error);
    }

    const usersInCity: User[] = await testAppService
      .usersInCity(city)
      .then((response) => response.data);

    const usersInRadius: User[] = await testAppService.usersInRadius(
      location,
      50
    );

    const result = _.union(usersInCity, usersInRadius);

    return res.status(200).json({
      users: result,
    });
  } catch (err) {
    return next(err);
  }
};
