var imageInput = document.getElementById('user-image');
var image = document.getElementById('profile-image');

imageInput.addEventListener('input', function (event) {
  image.setAttribute('src', imageInput.value);
});

var entryImageInput = document.getElementById('entry-image-url');
var entryImage = document.getElementById('entry-image');

entryImageInput.addEventListener('input', function (event) {
  entryImage.setAttribute('src', entryImageInput.value);
});

var formTwo = document.getElementById('form-two')

formTwo.addEventListener('submit', function (event) {
  data.profile.username = document.getElementById('user-name').value;
  data.profile.fullName = document.getElementById('full-name').value;
  data.profile.location = document.getElementById('location').value;
  data.profile.avatarUrl = document.getElementById('user-image').value;
  data.profile.bio = document.getElementById('bio').value;
  if (data.profile.username === '' || data.profile.fullName === '' || data.profile.location === '' || data.profile.avatarUrl === '' || data.profile.bio === '') {
    event.preventDefault();
    return;
  }
  if (currentData) {
  var _entries = currentData.entries;
  data.entries.push(_entries);
  }
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
  data.entries = [];
  swapView('profile');
  event.preventDefault();
});

var formFour = document.getElementById('form-four');
var formThree = document.getElementById('form-three');

formFour.addEventListener('submit', function (event) {
  var entryData = {};

  entryData.imageURL = document.getElementById('entry-image-url').value;
  entryData.title = document.getElementById('title').value;
  entryData.notes = document.getElementById('notes').value;

  if (entryData.imageURL === '' || entryData.title === '' || entryData.notes === '') {
    event.preventDefault();
    return;
  }

  currentData.entries.push(entryData);
  var entryJSON = JSON.stringify(currentData);
  localStorage.setItem('data-local-storage', entryJSON);

  formFour.reset();
  formThree.reset();
  entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapView('entries');
  event.preventDefault();
});

window.addEventListener('DOMContentLoaded', function (event) {
  if (currentData) {
    swapView('profile');
  }
});

function renderProfile() {

  var newData = JSON.parse(localStorage.getItem('data-local-storage'));

  var $rowOne = document.createElement('div');
  $rowOne.className = 'row';

  var $columnFull = document.createElement('div');
  $columnFull.className = 'column-full';

  var $header = document.createElement('h2');
  var $$head = document.createTextNode(newData.profile.fullName);
  $header.appendChild($$head);

  $columnFull.appendChild($header);
  $rowOne.appendChild($columnFull);

  var $rowTwo = document.createElement('div');
  $rowTwo.className = 'row';

  var $columnHalfOne = document.createElement('div');
  $columnHalfOne.className = 'column-half';

  var $imageContainer = document.createElement('div');
  $imageContainer.className = 'container image-container';

  var $image = document.createElement('img');
  $image.className = 'image';
  $image.setAttribute('src', newData.profile.avatarUrl);
  $image.setAttribute('alt', 'your image');

  $imageContainer.appendChild($image);
  $columnHalfOne.appendChild($imageContainer);
  $rowTwo.appendChild($columnHalfOne);

  var $columnHalfTwo = document.createElement('div');
  $columnHalfTwo.className = 'column-half';

  var $containerOne = document.createElement('div');
  $containerOne.className = 'container profile-info';

  var $profileIcon = document.createElement('img');
  $profileIcon.className = 'icon';
  $profileIcon.setAttribute('src', 'images/profile-icon.png');

  var $username = document.createElement('p');
  var $$user = document.createTextNode(newData.profile.username);
  $username.appendChild($$user);

  $containerOne.appendChild($profileIcon);
  $containerOne.appendChild($username);
  $columnHalfTwo.appendChild($containerOne);

  var $containerTwo = document.createElement('div');
  $containerTwo.className = 'container profile-info';

  var $locationIcon = document.createElement('img');
  $locationIcon.className = 'icon';
  $locationIcon.setAttribute('src', 'images/location-icon.png');

  var $location = document.createElement('p');
  var $$loc = document.createTextNode(newData.profile.location);
  $location.appendChild($$loc);

  $containerTwo.appendChild($locationIcon);
  $containerTwo.appendChild($location);
  $columnHalfTwo.appendChild($containerTwo);

  var $containerThree = document.createElement('div');
  $containerThree.className = 'container bio-info';

  var $bio = document.createElement('p');
  $bio.textContent = newData.profile.bio;

  var $link = document.createElement('a');
  $link.setAttribute('href', '#');
  $link.setAttribute('data-view', 'edit-profile');
  $link.setAttribute('class', 'edit-link')
  $link.textContent = 'Edit Profile';

  $containerThree.appendChild($bio);
  $containerThree.appendChild($link);
  $columnHalfTwo.appendChild($containerThree);

  $rowTwo.appendChild($columnHalfTwo);

  var $profileContainer = document.createElement('div');

  $profileContainer.appendChild($rowOne);
  $profileContainer.appendChild($rowTwo);

  return $profileContainer;
}

function swapView(name) {

  var views = document.querySelectorAll('.display');
  var profileData = JSON.parse(localStorage.getItem('data-local-storage'));

  var _username = document.getElementById('user-name');
  var _fullName = document.getElementById('full-name');
  var _userImage = document.getElementById('user-image');
  var _location = document.getElementById('location');
  var _bio = document.getElementById('bio');
  var _image = document.querySelector('.image');

  if (name === 'profile') {
    var $profileView = document.getElementById('profile-view');
    $profileView.innerHTML = '';
    $profileView.appendChild(renderProfile());
  }

  if (name === 'edit-profile') {
    _username.value = profileData.profile.username;
    _fullName.value = profileData.profile.fullName;
    _userImage.value = profileData.profile.avatarUrl;
    _location.value = profileData.profile.location;
    _bio.value = profileData.profile.bio;
    _image.setAttribute('src', profileData.profile.avatarUrl);
  }

  for (var i = 0; i < views.length; i++) {
    if (views[i].getAttribute('data-view') === name) {
      views[i].className = 'display';
      data.view = name;
    } else {
      views[i].className = 'hidden display';
    }
  }
}

addEventListener('click', function(event) {

  var _currentData = JSON.parse(localStorage.getItem('data-local-storage'));

  if (event.target.tagName !== "A") {
    return;
  }
  if (event.target.tagName === "A") {
    if (_currentData) {
    swapView(event.target.getAttribute('data-view'));
    }
    else {
      return;
    }
  }
})
