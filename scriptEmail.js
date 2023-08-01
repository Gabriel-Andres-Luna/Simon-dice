//Declaro la variable la cual se conecta con el html para detectar el evento submit
var contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', Send);

//Guardo todos los datos en variables.
function Send(event) {
  event.preventDefault();
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;
  sendEmail(name, email, message);
}

//Ejecuto la app predetermindada del sistema operativo para mandar email.
function sendEmail(name, email, message) {
  var subject = 'Mensaje de ' + encodeURIComponent(name);
  var body = encodeURIComponent(message);
  var mailtoLink = 'mailto:' + email + '?subject=' + subject + '&body=' + body;
  window.location.href = mailtoLink;
}