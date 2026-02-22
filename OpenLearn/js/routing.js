/**
 * Système de routage pour OpenLearn
 * Gère la navigation entre les pages du site
 */

// Configuration des routes
const routes = {
    '/': 'index.html',
    '/accueil': 'index.html',
    '/parcours': 'parcours.html',
    '/formations': 'formations.html',
    '/authentification': 'authentification.html',
    '/contact': 'contact.html',
};

/**
 * Initialise le système de routage
 */
function initialiserRouting() {
    // Gère les clics sur les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(lien => {
        lien.addEventListener('click', (e) => {
            const href = lien.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                naviguerVers(href);
            }
        });
    });

    // Gère les changements d'URL (bouton retour)
    window.addEventListener('popstate', () => {
        const chemin = window.location.pathname;
        chargerPage(routes[chemin] || 'index.html');
    });
}

/**
 * Navigue vers une section ou une page
 * @param {string} destination - La destination (#section ou /page)
 */
function naviguerVers(destination) {
    if (destination.startsWith('#')) {
        // Navigation vers une section (anchor)
        const element = document.querySelector(destination);
        if (element) {
            scrollVers(destination.substring(1));
            mettreAJourNavigation(destination);
        }
    } else {
        // Navigation vers une page
        changerPage(destination);
    }
}

/**
 * Change la page actuelle
 * @param {string} page - La page à charger
 */
function changerPage(page) {
    // Valide la page
    if (!page || page === 'authentification') {
        afficherAuthentification();
        return;
    }

    // Redirige vers la page
    window.location.href = page;
}

/**
 * Met à jour le statut actif dans la navigation
 * @param {string} anchor - L'anchor actif
 */
function mettreAJourNavigation(anchor) {
    document.querySelectorAll('.nav-link').forEach(lien => {
        lien.classList.remove('actif');
    });

    const lienActif = document.querySelector(`a[href="${anchor}"]`);
    if (lienActif) {
        lienActif.classList.add('actif');
    }
}

/**
 * Scroll fluide vers une section
 * @param {string} id - L'ID de la section
 */
function scrollVers(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Mise à jour du statut actif après le scroll
        setTimeout(() => mettreAJourNavigation(`#${id}`), 300);
    }
}

/**
 * Charge une page dynamiquement (AJAX)
 * @param {string} page - La page à charger
 */
async function chargerPage(page) {
    try {
        const response = await fetch(page);
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        const html = await response.text();
        document.body.innerHTML = html;
        window.history.pushState({}, '', page);
        initialiserRouting();
    } catch (erreur) {
        console.error('Erreur lors du chargement de la page:', erreur);
    }
}

/**
 * Affiche le formulaire d'authentification
 */
function afficherAuthentification() {
    window.location.href = 'authentification.html';
}

/**
 * Bascule entre les formulaires de connexion et inscription
 */
function basculerFormulaire() {
    const formulaireConnexion = document.getElementById('formulaire-connexion');
    const formulaireInscription = document.getElementById('formulaire-inscription');

    if (formulaireConnexion && formulaireInscription) {
        formulaireConnexion.classList.toggle('formulaire-actif');
        formulaireInscription.classList.toggle('formulaire-actif');
    }
}

// Initialise le routage au chargement de la page
document.addEventListener('DOMContentLoaded', initialiserRouting);