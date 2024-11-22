const establishments = [
  {
    id: 1,
    name: "McDonald's",
    logo: "https://www.press-agrum.com/wp-content/uploads/2024/02/logo-mcdonalds-1024x640.jpg",
    offers: [
      {
        id: 1,
        used: false
      }
    ]
  }
];
const establishmentList = document.getElementById('establishment-list');
const detailsModal = document.getElementById('details-modal');
const confirmationOverlay = document.getElementById('confirmationOverlay');
const closeDetailsButton = document.getElementById('close-details');
const box = document.querySelector('.boxconf');
let selectedEstablishment = null;
let selectedOffer = null;

// Function to open the details modal
function openDetails(estName) {
  selectedEstablishment = establishments.find(est => est.name === estName);
  if (selectedEstablishment) {
    document.getElementById('establishment-name').textContent = selectedEstablishment.name;
    
    // Met à jour le bouton d'utilisation de l'offre
    const offerButton = document.querySelector('.use-offer-button');
    const boxconf = document.querySelector('.boxconf');
    offerButton.textContent = selectedEstablishment.offers[0].used ? 'OFFRE DÉJÀ UTILISÉE' : 'UTILISER';
    offerButton.classList.toggle('used', selectedEstablishment.offers[0].used);  // Ajoute la classe CSS 'used' si l'offre est déjà utilisée
    detailsModal.classList.add('active');
  }
}

// Function to confirm offer use
function confirmUseOffer() {
  selectedOffer = selectedEstablishment.offers[0];
  if (selectedOffer && !selectedOffer.used) {
    confirmationOverlay.style.display = 'flex';
  }
}

// Confirm action
// Confirm action
// Fonction pour activer l'animation de remontée
function resetBox() {
  const boxconf = document.querySelector('.boxconf');
  boxconf.classList.remove('used');
  boxconf.classList.add('reverse');

  // Supprime la classe 'reverse' après l'animation pour pouvoir la rejouer
  setTimeout(() => {
    boxconf.classList.remove('reverse');
  }, 2000); // Durée de l'animation
}
// Appel de la fonction après l'utilisation de l'offre
function confirmOffer() {
  selectedOffer.used = true;  // Marque l'offre comme utilisée
  closeConfirmation();        // Ferme l'overlay de confirmation

  const boxconf = document.querySelector('.boxconf');
  boxconf.classList.add('used');
  
  // Met à jour le bouton d'utilisation de l'offre
  const offerButton = document.querySelector('.use-offer-button');
  offerButton.textContent = 'OFFRE DÉJÀ UTILISÉE';
  offerButton.classList.add('used');  

  // Retourne à la position initiale après l'animation
  setTimeout(() => {
    resetBox();
  }, 4500); // Lance la remontée après l'animation de descente
}

function animation(){
  const confirmationbox = document.querySelector('.confirmation-box');
  confirmationbox.style.display = 'none';
  const ariba = document.querySelector('.ariba');
  ariba.classList.add('used');  
  setTimeout(() =>{
    confirmOffer();  
  },500);
}

// Cancel action
function cancelOffer() {
  closeConfirmation();
}

// Close confirmation overlay
function closeConfirmation() {
  confirmationOverlay.style.display = 'none';
}

// Close details modal when clicking the back button
closeDetailsButton.addEventListener('click', () => {
  detailsModal.classList.remove('active');
});

// Function to show the card
function showCard() {
  document.getElementById('cardModal').style.display = 'flex';
}

// Function to close the card
function closeCard() {
  document.getElementById('cardModal').style.display = 'none';
}

// Initialize page
function init() {
  establishmentList.innerHTML = '';
  establishments.forEach(est => {
    const card = document.createElement('div');
    card.className = 'establishment-card';
    card.innerHTML = `<img src="${est.logo}" alt="${est.name}"><div class="heart-icon">❤️</div>`;
    card.onclick = () => openDetails(est.name);
    establishmentList.appendChild(card);
  });
}

// Run the init function
init();
