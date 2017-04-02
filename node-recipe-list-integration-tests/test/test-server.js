const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');

// this lets us use *should* style syntax in our tests
// so we can do things like `(1 + 1).should.equal(2);`
// http://chaijs.com/api/bdd/
const should = chai.should();

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);


describe('Shopping List', function() {

  // Before our tests run, we activate the server. Our `runServer`
  // function returns a promise, and we return the that promise by
  // doing `return runServer`. If we didn't return a promise here,
  // there's a possibility of a race condition where our tests start
  // running before our server has started.
  before(function() {
    return runServer();
  });

  // although we only have one test module at the moment, we'll
  // close our server at the end of these tests. Otherwise,
  // if we add another test module that also has a `before` block
  // that starts our server, it will cause an error because the
  // server would still be running from the previous tests.
  after(function() {
    return closeServer();
  });

  // test strategy:
  //   1. make request to `/shopping-list`
  //   2. inspect response object and prove has right code and have
  //   right keys in response object.
  it('should list items on GET', function() {
    // for Mocha tests, when we're dealing with asynchronous operations,
    // we must either return a Promise object or else call a `done` callback
    // at the end of the test. The `chai.request(server).get...` call is asynchronous
    // and returns a Promise, so we just return it.
    return chai.request(app)
      .get('/shopping-list')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');

        // because we create three items on app load
        res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        const expectedKeys = ['id', 'name', 'checked'];
        res.body.forEach(function(item) {
          item.should.be.a('object');
          item.should.include.keys(expectedKeys);
        });
      });
  });



  // test strategy:
  //  1. make a POST request with data for a new item
  //  2. inspect response object and prove it has right
  //  status code and that the returned object has an `id`
  it('should add an item on POST', function() {
    const newItem = {name: 'coffee', checked: false};
    return chai.request(app)
      .post('/shopping-list')
      .send(newItem)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'name', 'checked');
        res.body.id.should.not.be.null;
        // response should be deep equal to `newItem` from above if we assign
        // `id` to it from `res.body.id`
        res.body.should.deep.equal(Object.assign(newItem, {id: res.body.id}));
      });
  });

  // test strategy:
  //  1. initialize some update data (we won't have an `id` yet)
  //  2. make a GET request so we can get an item to update
  //  3. add the `id` to `updateData`
  //  4. Make a PUT request with `updateData`
  //  5. Inspect the response object to ensure it
  //  has right status code and that we get back an updated
  //  item with the right data in it.
  it('should update items on PUT', function() {
    // we initialize our updateData here and then after the initial
    // request to the app, we update it with an `id` property so
    // we can make a second, PUT call to the app.
    const updateData = {
      name: 'foo',
      checked: true
    };

    return chai.request(app)
      // first have to get so we have an idea of object to update
      .get('/shopping-list')
      .then(function(res) {
        updateData.id = res.body[0].id;
        // this will return a promise whose value will be the response
        // object, which we can inspect in the next `then` back. Note
        // that we could have used a nested callback here instead of
        // returning a promise and chaining with `then`, but we find
        // this approach cleaner and easier to read and reason about.
        return chai.request(app)
          .put(`/shopping-list/${updateData.id}`)
          .send(updateData);
      })
      // prove that the PUT request has right status code
      // and returns updated item
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.deep.equal(updateData);
      });
  });

  // test strategy:
  //  1. GET a shopping list items so we can get ID of one
  //  to delete.
  //  2. DELETE an item and ensure we get back a status 204
  it('should delete items on DELETE', function() {
    return chai.request(app)
      // first have to get so we have an `id` of item
      // to delete
      .get('/shopping-list')
      .then(function(res) {
        return chai.request(app)
          .delete(`/shopping-list/${res.body[0].id}`)
          .then(function(res) {
            console.log('this is the res.status for the delete');
            res.should.have.status(204);
          });
      });
  });
});


describe('Recipe List', function() {

  before(function(){
    return runServer();
  });


  after(function(){
    return closeServer();
  });

  it('Should recive a list of recipes on GET', function() {

    return chai.request(app)
      .get('/recipes')
      .then (function(res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.be.at.least(1);

        const recipeKeys = ['name', 'id', 'ingredients'];

        res.body.forEach(function(recipe) {
          recipe.should.be.a('object');
          recipe.should.include.keys(recipeKeys);
          
        });
      });
  }); // ends tests on GET

  it('Should add a recipe on post', function(){
    const newRecipe = {
      name: "Green Borscht",
      ingredients: [
        "5 cups of water",
        "4 cups of spinach",
        "5 hard-boiled eggs",
        "2 large cucumbers",
        "3 carrots",
        "1 tablespoon sour cream",
        "5 tablespoons of lemon juice"
      ]
    };

    return chai.request(app)
      .post('/recipes')
      .send(newRecipe)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('name', 'id', 'ingredients');
        res.body.id.should.not.be.null;
        res.body.should.deep.equal(Object.assign(newRecipe, {id: res.body.id}));

      });

  }); // ends tests on POST endpoint

  it("Should update recipes on PUT", function(){

    const updatedRecipe = {
      name: "Lemonade",
      ingredients: [
        "water",
        "lemon",
        "sugar"
      ]
    };

    return chai.request(app)
    .get('/recipes')
    .then(function (res) { 
      // console.log(res.body);
      // console.log(res.body[0]);
      updatedRecipe.id = res.body[0].id;

      return chai.request(app)
      .put(`/recipes/${updatedRecipe.id}`)
      .send(updatedRecipe);
    })
    .then(function (res){
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.should.be.json;
      res.body.should.deep.equal(updatedRecipe);
    });

  }); // ends update/put tests
  
  it("Should return an error message if the request has the wrong fields", function () {
    
    const incompleteRecipe = {
      "ingredients": [
        "water",
        "olive oil",
        "tomatoes",
        "honey"
      ]
    };


    return chai.request(app)
    .get('/recipes')
    .then(function (res) {
      // console.log (res.body[res.body.length-1].id)
      incompleteRecipe.id = res.body[0].id;
      // console.log(incompleteRecipe);

      return chai.request(app)
      .put(`/recipes/${incompleteRecipe.id}`)
      .send(incompleteRecipe);
      
    })
    .catch(function (err, res) {
      // console.log(err);
      // console.log(err.response.text);
      err.should.have.status(400);
      err.response.text.should.not.be.empty;
      err.response.text.should.be.a('string');
      
    });
    
  }); // ends put missing field test

  it('Should return a error message when the path and request ids do not match', function () { 
    const updatedRecipe = {
      "name": "Some kind of stuff",
      "ingredients": [
        "water",
        "olive oil",
        "tomatoes",
        "honey"
      ]
    };


    return chai.request(app)
  .get('/recipes')
  .then(function (res) {
    // console.log (res.body[res.body.length-1].id)
    updatedRecipe.id = res.body[0].id;
    // console.log(incompleteRecipe);
    const wrongID = res.body[res.body.length-1].id;

    return chai.request(app)
    .put(`/recipes/${wrongID}`)
    .send(updatedRecipe)
    .catch(function (err) {
      console.log(err.response.text);
      err.should.have.status(400);
      err.response.text.should.be.a('string'); 
    
    });
  });
  });

  it('Should delete items on delete requests', function() {

    return chai.request(app)
    .get('/recipes')
    .then(function (res) {
      return chai.request(app)
      .delete(`/recipes/${res.body[0].id}`)
      .then(function (res) {
        res.should.have.status(204);
      });
    });  
  });
}); // ends tests

