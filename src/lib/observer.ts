export function observeReservationButton() {
    const reservationButton = document.getElementById('reservation_button');
  
    if (!reservationButton) {
      console.error('Element with id "reservation_button" not found');
      return;
    }
  
    const observerOptions = {
      root: null, // Par rapport au viewport
      rootMargin: '0px',
      threshold: 0 // Le callback sera déclenché dès que l'élément n'est plus visible
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          console.log('Le bouton de réservation est sorti de l\'écran');
          // Faites quelque chose ici lorsque l'élément sort de l'écran
        } else {
          console.log('Le bouton de réservation est visible à nouveau');
          // Faites quelque chose ici lorsque l'élément est à nouveau visible
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    observer.observe(reservationButton);
  }
  