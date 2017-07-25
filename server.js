// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form and JSON data)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

//INDEX ROUTE
app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

//CREATE ROUTE
app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

  var task = req.body.task;
  var description = req.body.description;
  var id = req.body._id;
  id = todos.length + 1;
  var newObj = {_id: id, task: task, description: description};
  todos.push(newObj);
  console.log({todos: todos});
  res.json(newObj);
});

//SHOW ROUTE
app.get('/api/todos/:id', function show(req, res) {
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
  var id = req.params.id;
  var selectedTodo;
  console.log(id);
  for (var i = 0; i < todos.length; i++) {
    console.log("running");
    if (id == todos[i]._id) {
      selectedTodo = todos[i];
    }
  }
  res.send(selectedTodo);
});

app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */
  var todoToUpdate;
  for (var i = 0; i < todos.length; i++) {
    if(req.params.id == todos[i]._id) {
      todoToUpdate = todos[i];
      todoToUpdate._id = parseInt(req.params.id);
      todoToUpdate.task = req.body.task;
      todoToUpdate.description = req.body.description;
      todos.splice(i, 1, todoToUpdate);
    }
  }
  res.json(todoToUpdate);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with deleted todo.
   */
  var todoToDelete;
  for (var i = 0; i < todos.length; i++) {
    if(req.params.id == todos[i]._id) {
      todoToDelete = todos[i];
      todos.splice(i, 1);
    }
  }
  res.json(todoToDelete);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
