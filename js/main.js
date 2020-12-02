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
});

addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
});
