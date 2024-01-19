const request = require('supertest');
const buildApp = require('../../app');
const userRepo = require('../../repos/user-repo');
const pool = require('../../pool');

beforeAll(()=>{
    return pool.connect({
        host: 'localhost',
        port: 5432,
        database: 'socialnetwork',
        user: 'postgres',
        password: 'root'
    });
});

afterAll(()=>{
    return pool.close();
});

it('create a user', async ()=>{
    const startingCount = await userRepo.count();
    expect(startingCount).toEqual(0);
    
    await request(buildApp())
        .post('/users')
        .send({ username: 'testuser', bio: 'test bio'})
        .expect(200);
    
    const endingCount = await userRepo.count();
    expect(endingCount).toEqual(1);
});

