import { findByEmail } from '../models/usersModel.js';
import * as Response from "../lib/response.js";
import {constants} from "node:http2";


/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return Response.errorResponse(res, 'Unauthorized: missing token', constants.HTTP_STATUS_UNAUTHORIZED);
  }
  const email = authHeader.split(' ')[1];
  if (!email) {
    return Response.errorResponse(res, 'Unauthorized: invalid token', constants.HTTP_STATUS_UNAUTHORIZED);
  }

  const user = await findByEmail(email);
  if (!user) {
    return Response.errorResponse(res, 'Unauthorized: user not found', constants.HTTP_STATUS_UNAUTHORIZED);
  }

  req.user = user;
  next();
}