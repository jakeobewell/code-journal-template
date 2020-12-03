var imageInput = document.getElementById('user-image');
var image = document.querySelector('.image');

imageInput.addEventListener('input', function (event) {
  image.setAttribute('src', imageInput.value);
});

var data = {
  view: 'edit-profile',
  profile: {
    username: '',
    fullName: '',
    location: '',
    avatarUrl: '',
    bio: ''
  },
  entries: []
};

addEventListener('submit', function (event) {
  data.profile.username = document.getElementById('user-name').value;
  data.profile.fullName = document.getElementById('full-name').value;
  data.profile.location = document.getElementById('location').value;
  data.profile.avatarUrl = document.getElementById('user-image').value;
  data.profile.bio = document.getElementById('bio').value;
  if (data.profile.username === '' || data.profile.fullName === '' || data.profile.location === '' || data.profile.avatarUrl === '' || data.profile.bio === '') {
    event.preventDefault();
    return;
  }
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
  swapView('profile');
  event.preventDefault();
});

window.addEventListener('DOMContentLoaded', function (event) {
  var currentData = JSON.parse(localStorage.getItem('data-local-storage'));
  if (currentData) {
    swapView('profile');
  } else {
    swapView('edit-profile');
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

  $containerThree.appendChild($bio);
  $columnHalfTwo.appendChild($containerThree);

  $rowTwo.appendChild($columnHalfTwo);

  var $profileContainer = document.createElement('div');

  $profileContainer.appendChild($rowOne);
  $profileContainer.appendChild($rowTwo);

  return $profileContainer;
}

function swapView(name) {

  var views = document.querySelectorAll('.display');

  if (name === 'profile') {
    var $profileView = document.getElementById('profile-view');
    $profileView.innerHTML = '';
    $profileView.appendChild(renderProfile());
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
