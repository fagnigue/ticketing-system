import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/seats (GET)', () => {
    return request(app.getHttpServer()).get('/seats').expect(200);
  });

  it('/reservations (GET)', () => {
    return request(app.getHttpServer()).get('/reservations').expect(401);
  });
});
