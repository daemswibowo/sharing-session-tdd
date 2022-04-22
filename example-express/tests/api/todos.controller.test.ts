import supertest from 'supertest';
import server from '../../server';

describe('Todos controller test', () => {
  describe('Get list of todos on GET /api/v1/todos =>', function () {
    it('should return my todos', async function () {
      await supertest(server)
        .get('/api/v1/todos')
        .expect(200)
        .expect([
          {
            id: 1,
            name: 'Deploy server',
          },
          {
            id: 2,
            name: 'Review PR',
          },
        ]);
    });
  });

  describe('Store my todo on POST /api/v1/todos =>', function () {
    it('should store my todo', async function () {
      const body = {
        name: 'Review PR',
      };
      await supertest(server)
        .post('/api/v1/todos')
        .send(body)
        .expect(201)
        .expect({
          id: 3,
          ...body,
        });
    });

    it('should return error 422 on submitting without sending required value', async function () {
      const body = {
        name: '',
      };
      await supertest(server)
        .post('/api/v1/todos')
        .send(body)
        .expect(422)
        .expect({
          message: 'Invalid value',
          error: {
            name: ['value is required'],
          },
        });
    });
  });

  describe('Delete my todos on DELETE /api/v1/todos/:id =>', function () {
    it('should delete my todo', async function () {
      const body = {
        name: 'Review PR',
      };
      await supertest(server).delete('/api/v1/todos/1').send(body).expect(200);
    });

    it('should return error 404 when there is no todo with the given ID', async function () {
      const body = {
        name: 'Review PR',
      };
      await supertest(server)
        .delete('/api/v1/todos/100')
        .send(body)
        .expect(404);
    });
  });
});
