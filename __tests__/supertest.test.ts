import supertest from 'supertest';
import app from '../server/server';

const request = supertest(app);

describe('API Endpoints', () => {
  it('should respond with status 200 for the "/" endpoint', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });

  it('should respond with status 401 for invalid login credentials', async () => {
    const response = await request
      .post('/login')
      .send({ username: 'test', password: 'test' });
    expect(response.status).toBe(401);
  });

  it('should get a list of pets', async () => {
    const response = await request.get('/pets');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add a new pet', async () => {
    const newPet = {
      name: 'Test Pet',
      age: 5,
      description: 'a test pet',
      url: 'https://example.com/test-pet',
    };
    const response = await request.post('/pets').send(newPet);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', newPet.name);
  });

  const addedPetId = '6546f77ec90664faa822e8f2';

  it('should update an existing pet', async () => {
    const updatedPet = {
      name: 'Mimi',
      age: 5,
      description: 'an updated test pet',
      url: 'https://www.catster.com/wp-content/uploads/2017/08/Pixiebob-cat.jpg',
    };
    const response = await request
      .patch(`/pets/${addedPetId}`)
      .send(updatedPet);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', updatedPet.name);
  });

  it('should delete an existing pet', async () => {
    const response = await request.delete(`/pets/${addedPetId}`);
    expect(response.status).toBe(200);
  });
});
