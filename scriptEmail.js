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
  var mailtoLink = `mailto:${email}?subject=${encodeURIComponent(`Mensaje de ${name}`)}&body=${encodeURIComponent(message)}`;
  window.location.href = mailtoLink;
}
