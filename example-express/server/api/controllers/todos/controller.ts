import { Request, Response } from 'express';
import TodosService from '../../services/todos.service';

export class Controller {
  all(_: Request, res: Response) {
    TodosService.all().then((r) => res.json(r));
  }

  create(req: Request, res: Response) {
    if (!req.body.name) {
      res
        .status(422)
        .json({
          message: 'Invalid value',
          error: {
            name: ['value is required'],
          },
        })
        .end();
      return;
    }
    TodosService.create(req.body.name).then((r) =>
      res.status(201).json(r).end()
    );
  }

  async delete(req: Request, res: Response) {
    const id = Number.parseInt(req.params['id']);

    const result = await TodosService.show(id);

    if (!result) {
      res.status(404).end();
      return;
    }

    TodosService.delete(id).then((r) => res.status(200).json(r).end());
  }
}

export default new Controller();
