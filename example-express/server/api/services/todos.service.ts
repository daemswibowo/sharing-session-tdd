import L from '../../common/logger';
import lodash from '../../utils/lodash';

let id = 1;

interface Todo {
  id: number;
  name: string;
}

const todos: Todo[] = [
  { id: id++, name: 'Deploy server' },
  { id: id++, name: 'Review PR' },
];

export class TodosService {
  all(): Promise<Todo[]> {
    L.info(todos, 'fetch all todos');
    return Promise.resolve(todos);
  }

  show(id: number): Promise<Todo> {
    L.info(`fetch todo with id ${id}`);
    return this.all().then((r) => r[id]);
  }

  create(name: string): Promise<Todo> {
    L.info(`create todo with name ${name}`);
    const todo: Todo = {
      id: id++,
      name,
    };
    todos.push(todo);
    return Promise.resolve(todo);
  }

  async delete(id: number) {
    const index: number = lodash.findIndex(await this.all(), { id });
    if (index >= 0) {
      delete todos[index];
      return true;
    }

    return false;
  }
}

export default new TodosService();
