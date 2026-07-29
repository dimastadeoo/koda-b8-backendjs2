import { findByEmail, createUser } from '../models/usersModel.js';
import * as Response from "../lib/response.js";
import { constants } from "node:http2";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function register(req, res) {
  try {
    const { email, password, name } = req.body;
    console.log(req.body);
    if (!email || !password || !name) {
      return Response.errorResponse(res, 'Email Or password Or name required', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const existing = await findByEmail(email);
    if (existing) {
      return Response.errorResponse(res, 'Email already exists', constants.HTTP_STATUS_BAD_REQUEST);

    }

    const user = await createUser(email, password, name);
    const results = { name: user.name, email: user.email };

    Response.successResponse(res, 'User registered successfully', results, constants.HTTP_STATUS_CREATED);

  } catch (error) {
    const err = "Fail Register Data Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return Response.errorResponse(res, 'Email and password required', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const user = await findByEmail(email);
    if (!user || user.password !== password) {
      return Response.errorResponse(res, 'User or password wrong', constants.HTTP_STATUS_UNAUTHORIZED);
    }

    const results = { token: email, user: { id: user.id, email: user.email } };
    Response.successResponse(res, `User ${user.email} Login successfully`, results);

  } catch (error) {
    const err = "Fail Login Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}