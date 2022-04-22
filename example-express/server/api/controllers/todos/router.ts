import express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .post('/', controller.create)
  .delete('/:id', controller.delete);
