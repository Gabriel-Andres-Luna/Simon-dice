const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', Send);

function Send(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  sendEmail(name, email, message);
}

function sendEmail(name, email, message) {
}
