// PROFILE MODAL SECTION
// Get the modal
var modal = document.getElementById("profile-modal");

// Get the button that opens the modal
var btn = document.getElementById("btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//*************************SERVICES MODAL SECTION ***************************** //

//*************************SERVICES MODAL ENDS ***************************** //

// Toggle navbar icon
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.menu_list');

menuIcon.onclick = () => {
  menuIcon.classList.toggle('bx-x');
  navbar.classList.toggle('active')
}

//  Scroll sections
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      // active navbar links
      navLinks.forEach(links => {
        links.classList.remove('active');
        document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
      });ve
      // active section for animation on scroll
      sec.classList.add('show-animate');
    }
    // to use animation that repeats on scroll
    else {
      sec.classList.remove('show-animate');
    }
  });

  // sticky header
  let header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 100);

  // Remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove('bx-x');
  navbar.classList.remove('active')
}

//*************************CONTACT FORM ***************************** //
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type"submit"]');
      const statusMessage = document.getElementById('statusMessage');

      // Disable button and show loading
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      if (statusMessage) statusMessage.textContent = '';

      const formData = {
        fullName: contactForm.querySelector('input[placeholder="Full Name"]').value,
        email: contactForm.querySelector('input[placeholder="Email"]').value,
        message: contactForm.querySelector('input[placeholder="Your Massage"]').value
      };
      try {
        const response = await fetch('http://localhost:3000/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          if (statusMessage) {
            statusMessage.style.color = 'var(--main-color)';
            statusMessage.textContent = 'Thank you! Your message has been sent successfully.';
          }
          contactForm.requestFullscreen();
        } else {
          throw new Error(data.error || 'Something went wrong');
        }
      } catch (error) {
        if (statusMessage) {
          statusMessage.style.color = '#ff4444';
          statusMessage.textContent = 'Error: ' + error.message;
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
      }
    });
  }
});
//*************************CONTACT FORM ENDS ***************************** //
