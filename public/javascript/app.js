var firebase = 'https://oceancreature.firebaseio.com/';
var grumpyArray = [];

function GrumpyCat(url, title) {
  this.img = url;
  this.title = title;
}

function getAllGrumpyCats() {
  var req = new XMLHttpRequest();
  req.open('GET', firebase + '.json', true);
  req.onload = function() {
    var response = JSON.parse(req.response);
    grumpyArray.length = 0; //clears out the array
    for(var prop in response) {
      response[prop]._id = prop;
      grumpyArray.push(response[prop]);
    }
    displayGrumpyCats();
  }
  req.send();
}

function createGrumpy() {
  var url = document.getElementById('inputUrl');
  var title = document.getElementById('inputTitle');

  var grumps = new GrumpyCat(url.value, title.value);
  postGrumpyCat(grumps);
}

function postGrumpyCat(grumpy) {
  var req = new XMLHttpRequest();
  req.open('POST', firebase + '.json', true);
  req.onload = function() {
    // var res = JSON.parse(req.response);
    // grumpy._id = res.name;
    // grumpyArray.push(grumpy);
    getAllGrumpyCats();
  };
  req.send(JSON.stringify(grumpy));
}

function showEditModal(i) {
  $('#myModal').modal('toggle');
  document.getElementById('editUrl').value = grumpyArray[i].img;
  document.getElementById('editTitle').value = grumpyArray[i].title;
  document.getElementById('edit-button').innerHTML = '<button class="btn btn-primary" onclick="saveGrumpyCat(\'' + grumpyArray[i]._id + '\')">Save</button>'
}

function saveGrumpyCat(id) {
  $('#myModal').modal('toggle');
  var img = document.getElementById('editUrl');
  var title = document.getElementById('editTitle');
  var grumps = new GrumpyCat(img.value, title.value);

  putGrumpyCat(grumps, id);

  img.value = ""; title.value = "";
}

function putGrumpyCat(grumps, id) {
  var req = new XMLHttpRequest();
  req.open('PUT', firebase + id + '/.json', true);
  req.onload = function() {
    getAllGrumpyCats();
  }
  req.send(JSON.stringify(grumps));
}

function deleteGrumpyCat(id) {
  var req =  new XMLHttpRequest();
  req.open('DELETE', firebase + id + '/.json');
  req.onload = function() {
    getAllGrumpyCats();
  }
  req.send();
}

function displayGrumpyCats() {
  var elemString = "";
  for(var i = 0; i < grumpyArray.length; i++) {
    elemString += '<div class="col-sm-3"><img src="' + grumpyArray[i].img + '" class="img-responsive"/><h3>' + grumpyArray[i].title + '</h3><br/><button class="btn btn-warning" onclick="showEditModal(' + i + ')">Edit</button><button class="btn btn-danger" onclick="deleteGrumpyCat(\'' + grumpyArray[i]._id + '\')">Delete</button></div>'
  }
  document.getElementById('grumpy-cats').innerHTML = elemString;
}

//Run these scripts on script load
getAllGrumpyCats();
