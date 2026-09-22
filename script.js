document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Fermer le menu lors du clic sur un lien
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 2. Gestion de l'envoi du Formulaire via Formspree
  const quoteForm = document.getElementById('quote-form');
  const formStatus = document.getElementById('form-status');

  if (quoteForm && formStatus) {
    quoteForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = quoteForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.textContent = "Envoi en cours...";

      const data = new FormData(quoteForm);

      try {
        const response = await fetch(quoteForm.action, {
          method: 'POST',
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.textContent = "Merci ! Votre demande a bien été envoyée. L'équipe M.S. Production vous recontactera rapidement.";
          formStatus.className = "rounded-lg bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-800";
          formStatus.classList.remove('hidden');
          quoteForm.reset();
        } else {
          throw new Error("Erreur lors de l'envoi");
        }
      } catch (error) {
        formStatus.textContent = "Une erreur est survenue lors de l'envoi. Veuillez nous contacter directement par WhatsApp ou par e-mail.";
        formStatus.className = "rounded-lg bg-rose-50 p-4 text-center text-sm font-semibold text-rose-800";
        formStatus.classList.remove('hidden');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }
});
const backToTopButton = document.getElementById("backToTop");

// Détecter le défilement (scroll) de la page
window.onscroll = function() {
  // Affiche le bouton dès qu'on défile de plus de 300px vers le bas
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// Action au clic sur le bouton
backToTopButton.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Animation de défilement fluide
  });
});