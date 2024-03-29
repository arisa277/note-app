import { RequestHandler } from "express";
import knex from '../config/knex';


export const createNote: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const [createdNote] = await knex('note').insert({ title, content }).returning('*');
    res.status(201).json({ message: "Created the note", createdNote });
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    const notes = await knex('note').select('*').orderBy('updated_at', 'desc');
    res.json({ notes });
  } catch (error) {
    next(error);
  }
};

export const updateNote: RequestHandler<{ id: string }> = async (req, res, next) => {
  const noteId = +req.params.id;
  const { title, content } = req.body;
  const updated_at = new Date();
  try {
    const [updatedNote] = await knex('note').where({ id: noteId }).update({ title, content, updated_at }).returning('*');
    if (!updatedNote) {
      return res.status(404).send('Note not found');
    }
    res.json({ message: "Updated!", updatedNote });
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler<{ id: string }> = async (req, res, next) => {
  const noteId = +req.params.id;
  try {
    const deleted = await knex('note').where({ id: noteId }).del();
    if (!deleted) {
      return res.status(404).send('Note not found');
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
