const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('convert valid input GET requests to /api/convert',(done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input:'10L'})
    .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body.initNum,10);
      assert.equal(res.body.initUnit,'L');
      assert.approximately(res.body.returnNum,2.64172,0.1);
      assert.equal(res.body.returnUnit,'gal');
      done();
    })
  })

  test('convert invalid input GET reqests to /api/convert',(done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input:'32g'})
    .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body.initUnit,undefined);
      done();
    })
  })

  test('convert invalid number GET reqests to /api/convert',(done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input:'3/7.2/4kg'})
    .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body.initNum,undefined);
      done();
    })
  })

test('convert invalid number and invalid unit input GET reqests to /api/convert',(done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input:'3/7.2/4kilomegagram'})
    .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body.initNum,undefined);
      assert.equal(res.body.initUnit,undefined);
      done();
    })
  })

  test('convert input without a number',(done)=>{
    chai.request(server)
    .get('/api/convert')
    .query({input:"kg"})
    .end((err,res)=>{
      assert.equal(res.status,200);
      assert.equal(res.body.initNum,1);
      done();
    })
  })
});
