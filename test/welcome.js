import request from 'supertest';
import server from '../server';

describe('GET /welcome', () => {
  it('respond with html', function(done) {
    this.timeout(4000);
    request(server)
      .get('/welcome')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200, done);
  });

  it('has names in body', function(done) {
    this.timeout(4000);
    request(server)
      .get('/welcome')
      .set('Accept', 'text/html')
      .expect(200)
      .expect(/Leon/)
      .expect(/Someone else/, done);
  });
});
