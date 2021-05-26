// test/server.js
var chai  = require("chai");
var expect  = require("chai").expect;
var request = require("request");

describe("Quote API", function() {
  describe("Get multiple qutes", function() {

    const url = "http://localhost:3000/quotes"

    it("returns status 200", function(done) {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
    it("response body has property 'data'", function(done) {
        request(url, function(error, response, body) {
            //expect(response).be.a('object')
            //expect(JSON.parse(response.body)).to.deep.equal({data: });
            // https://www.chaijs.com/api/bdd/
            expect(JSON.parse(response.body))
                .to.have.property("data")
            //expect('Content-Type', /json/);
            done();
            });
        });

  });

  describe("Get single quotes", function() {
    const url = "http://localhost:3000/quotes/5"


  it("returns status 200", function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it("response body has property 'id 5'", function(done) {
      request(url, function(error, response, body) {
          //expect(response).be.a('object')
          //expect(JSON.parse(response.body).to.deep.equal({id: 5}));
           expect(JSON.parse(response.body)).to.have.property('meta')
              //.to.include('data',[{id: 4}]) 
          //expect('Content-Type', /json/);
          done();
          });
      });

});

// testa att göra en post 
describe("Post a quote and author", function() {
  const url = "http://localhost:3000/"

  it("returns status 200", function(done) {
    request(url, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  /*it('should send parameters to : /path POST', function(done) {
    request(url)
    .post('/')
    // .field('myparam' , 'test')
    //.set('content-type', 'application/x-www-form-urlencoded')
    .send(JSON.parse("{'quote': 'test', 'author': 'Test 3 author' }"))
    .end(function(error, response, body) {
        if (error) {
            done(error);
        } else {
            done();
        }
      });
    });*/
});

});
