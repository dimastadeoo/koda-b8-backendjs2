import { findByUserId, createNote, updateNote, deleteNote, findById } from '../models/notesModel.js';
import * as Response from "../lib/response.js";
import {constants} from "node:http2";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function getNotes(req, res) {
  try {
    console.log(req.user);
    const userId = req.user.userId;
    const notes = await findByUserId(userId);
    Response.successResponse(res, 'Notes retrieved successfully', notes);
    
  } catch (error) {
    const err = "Fail get Data Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function createNoteHandler(req, res) {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return Response.errorResponse(res, 'Title and content required', constants.HTTP_STATUS_BAD_REQUEST);
    }
    const userId = req.user.userId;
    const newNote = await createNote(userId, title, content);
    Response.successResponse(res, 'Note created successfully', newNote, constants.HTTP_STATUS_CREATED);

  } catch (error) {
    const err = "Fail Create Data Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function updateNoteHandler(req, res) {
  try {
    const noteId = parseInt(req.params.id); // ID sekarang integer
    const { title, content } = req.body;
    if (!title || !content) {
      return Response.errorResponse(res, 'Title and content required', constants.HTTP_STATUS_BAD_REQUEST);
    }

    const note = await findById(noteId);
    if (!note) {
      return Response.errorResponse(res, 'Note not found', constants.HTTP_STATUS_NOT_FOUND);
    }
    if (note.userId !== req.user.userId) {
      return Response.errorResponse(res, 'Forbidden: you do not own this note', constants.HTTP_STATUS_FORBIDDEN);
    }

    const updatedNote = await updateNote(noteId, title, content);
    Response.successResponse(res, 'Note updated successfully', updatedNote);

  } catch (error) {
    const err = "Fail Update Data Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 */
export async function deleteNoteHandler(req, res) {
  try {
    const noteId = parseInt(req.params.id);
    const note = await findById(noteId);
    if (!note) {
      return Response.errorResponse(res, 'Note not found', constants.HTTP_STATUS_NOT_FOUND);
    }
    if (note.userId !== req.user.userId) {
      return Response.errorResponse(res, 'Forbidden: you do not own this note', constants.HTTP_STATUS_FORBIDDEN);
    }

    const deleted = await deleteNote(noteId);
    if (!deleted) {
      return Response.errorResponse(res, 'Note not found', constants.HTTP_STATUS_NOT_FOUND);
    }
    Response.successResponse(res, 'Note deleted successfully');
  } catch (error) {
    const err = "Fail Deleted Data Because " + error;
    console.error(err);
    Response.errorResponse(res, err);
  }
}