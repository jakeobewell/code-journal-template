/* exported data */

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

if (JSON.parse(localStorage.getItem('data-local-storage')) !== null) {
  var currentData = JSON.parse(localStorage.getItem('data-local-storage'));
}

window.addEventListener('beforeunload', function (event) {
  var currentDataJSON = JSON.stringify(currentData);
  localStorage.setItem('javascript-local-storage', currentDataJSON);
});
