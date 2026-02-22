/**
 * Application principale OpenLearn
 * Gère la logique globale du site
 */

// ==============================================
// GESTION DES FORMULAIRES
// ==============================================

/**
 * Traite la soumission du formulaire de connexion
 * @param {Event} event - L'événement du formulaire
 */
function traiterConnexion(event) {
    event.preventDefault();

    // Récupère les données du formulaire
    const email = document.getElementById('email-connexion').value;
    const motDePasse = document.getElementById('mdp-connexion').value;

    // Validation
    if (!validerEmail(email)) {
        afficherNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    if (motDePasse.length < 6) {
        afficherNotification('Le mot de passe doit contenir au moins 6 caractères', 'error');
        return;
    }

    // Simule l'envoi
    const bouton = event.target.querySelector('button[type="submit"]');
    bouton.disabled = true;
    bouton.textContent = 'Connexion en cours...';

    setTimeout(() => {
        // Simule une réponse du serveur
        localStorage.setItem('utilisateur', JSON.stringify({ email, connecte: true }));
        afficherNotification('Connexion réussie! Redirection...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

/**
 * Traite la soumission du formulaire d'inscription
 * @param {Event} event - L'événement du formulaire
 */
function traiterInscription(event) {
    event.preventDefault();

    // Récupère les données du formulaire
    const nom = document.getElementById('nom-inscription').value;
    const email = document.getElementById('email-inscription').value;
    const motDePasse = document.getElementById('mdp-inscription').value;
    const confirmation = document.getElementById('mdp-confirmation').value;
    const pays = document.getElementById('pays-inscription').value;
    const niveau = document.getElementById('niveau-inscription').value;

    // Validations
    if (!nom || nom.length < 3) {
        afficherNotification('Veuillez entrer un nom valide (min. 3 caractères)', 'error');
        return;
    }

    if (!validerEmail(email)) {
        afficherNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    if (!validerMotDePasse(motDePasse)) {
        afficherNotification(
            'Le mot de passe doit contenir au moins 8 caractères, 1 majuscule et 1 chiffre',
            'error'
        );
        return;
    }

    if (motDePasse !== confirmation) {
        afficherNotification('Les mots de passe ne correspondent pas', 'error');
        return;
    }

    if (!pays) {
        afficherNotification('Veuillez sélectionner votre pays', 'error');
        return;
    }

    if (!niveau) {
        afficherNotification('Veuillez sélectionner votre niveau', 'error');
        return;
    }

    // Simule l'envoi
    const bouton = event.target.querySelector('button[type="submit"]');
    bouton.disabled = true;
    bouton.textContent = 'Création du compte...';

    setTimeout(() => {
        // Sauvegarde les données localement
        const utilisateur = {
            nom,
            email,
            pays,
            niveau,
            connecte: true,
            dateInscription: new Date().toISOString()
        };

        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
        afficherNotification('Compte créé avec succès! Redirection...', 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }, 1500);
}

/**
 * Traite la soumission du formulaire de contact
 * @param {Event} event - L'événement du formulaire
 */
function traiterContact(event) {
    event.preventDefault();

    // Récupère les données du formulaire
    const nom = document.getElementById('nom-contact').value;
    const email = document.getElementById('email-contact').value;
    const telephone = document.getElementById('telephone-contact').value;
    const sujet = document.getElementById('sujet-contact').value;
    const message = document.getElementById('message-contact').value;

    // Validations
    if (!nom || nom.length < 3) {
        afficherNotification('Veuillez entrer un nom valide', 'error');
        return;
    }

    if (!validerEmail(email)) {
        afficherNotification('Veuillez entrer une adresse email valide', 'error');
        return;
    }

    if (!sujet) {
        afficherNotification('Veuillez sélectionner un sujet', 'error');
        return;
    }

    if (!message || message.length < 10) {
        afficherNotification('Le message doit contenir au moins 10 caractères', 'error');
        return;
    }

    // Simule l'envoi
    const bouton = event.target.querySelector('button[type="submit"]');
    bouton.disabled = true;
    bouton.textContent = 'Envoi du message...';

    setTimeout(() => {
        // Sauvegarde le message dans le localStorage
        const messages = JSON.parse(localStorage.getItem('messages') || '[]');
        messages.push({
            nom,
            email,
            telephone,
            sujet,
            message,
            date: new Date().toISOString()
        });
        localStorage.setItem('messages', JSON.stringify(messages));

        afficherNotification('Message envoyé avec succès! Nous vous répondrons bientôt.', 'success');

        // Réinitialise le formulaire
        event.target.reset();
        bouton.disabled = false;
        bouton.textContent = 'Envoyer le message';
    }, 1500);
}

/**
 * Traite la connexion via réseaux sociaux
 * @param {string} reseau - Le réseau social
 */
function connexionSociale(reseau) {
    afficherNotification(`Connexion avec ${reseau} en cours...`, 'info');

    setTimeout(() => {
        // Simule la connexion
        const utilisateur = {
            reseau,
            connecte: true,
            dateConnexion: new Date().toISOString()
        };

        localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
        afficherNotification(`Connexion via ${reseau} réussie!`, 'success');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }, 1200);
}

// ==============================================
// VALIDATIONS
// ==============================================

/**
 * Valide une adresse email
 * @param {string} email - L'email à valider
 * @returns {boolean} - True si l'email est valide
 */
function validerEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valide un mot de passe
 * @param {string} motDePasse - Le mot de passe à valider
 * @returns {boolean} - True si le mot de passe est valide
 */
function validerMotDePasse(motDePasse) {
    // Min. 8 caractères, 1 majuscule, 1 chiffre
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(motDePasse);
}

// ==============================================
// GESTION DE LA SESSION UTILISATEUR
// ==============================================

/**
 * Récupère les informations de l'utilisateur connecté
 * @returns {Object|null} - Les données de l'utilisateur ou null
 */
function obtenirUtilisateur() {
    const utilisateur = localStorage.getItem('utilisateur');
    return utilisateur ? JSON.parse(utilisateur) : null;
}

/**
 * Vérifie si un utilisateur est connecté
 * @returns {boolean} - True si connecté
 */
function estConnecte() {
    const utilisateur = obtenirUtilisateur();
    return utilisateur && utilisateur.connecte === true;
}

/**
 * Déconnecte l'utilisateur
 */
function deconnecter() {
    localStorage.removeItem('utilisateur');
    afficherNotification('Vous avez été déconnecté', 'info');
    window.location.href = 'index.html';
}

/**
 * Met à jour le bouton de connexion selon l'état de l'utilisateur
 */
function mettreAJourBoutonConnexion() {
    const boutonConnexion = document.querySelector('.btn-connexion');
    const utilisateur = obtenirUtilisateur();

    if (utilisateur && boutonConnexion) {
        boutonConnexion.textContent = `Déconnexion`;
        boutonConnexion.onclick = deconnecter;
    }
}

// ==============================================
// GESTION DU PANIER D'INSCRIPTION
// ==============================================

/**
 * Ajoute une formation au panier
 * @param {Object} formation - La formation à ajouter
 */
function ajouterAuPanier(formation) {
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');

    // Vérifie si la formation n'est pas déjà dans le panier
    if (!panier.find(f => f.id === formation.id)) {
        panier.push(formation);
        localStorage.setItem('panier', JSON.stringify(panier));
        afficherNotification(`${formation.nom} ajoutée au panier`, 'success');
    } else {
        afficherNotification(`${formation.nom} est déjà dans votre panier`, 'info');
    }
}

/**
 * Retire une formation du panier
 * @param {string} formationId - L'ID de la formation
 */
function retirerDuPanier(formationId) {
    let panier = JSON.parse(localStorage.getItem('panier') || '[]');
    panier = panier.filter(f => f.id !== formationId);
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherNotification('Formation retirée du panier', 'info');
}

/**
 * Récupère le panier actuel
 * @returns {Array} - Le panier
 */
function obtenirPanier() {
    return JSON.parse(localStorage.getItem('panier') || '[]');
}

// ==============================================
// UTILITAIRES
// ==============================================

/**
 * Formate une date en français
 * @param {string} dateString - La date au format ISO
 * @returns {string} - La date formatée
 */
function formaterDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('fr-FR', options);
}

/**
 * Copie du texte dans le presse-papiers
 * @param {string} texte - Le texte à copier
 */
function copierDansPressePapiers(texte) {
    navigator.clipboard.writeText(texte).then(() => {
        afficherNotification('Copié dans le presse-papiers!', 'success');
    }).catch(() => {
        afficherNotification('Erreur lors de la copie', 'error');
    });
}

/**
 * Obtient un paramètre d'URL
 * @param {string} parametre - Le paramètre à récupérer
 * @returns {string|null} - La valeur du paramètre ou null
 */
function obtenirParametreURL(parametre) {
    const params = new URLSearchParams(window.location.search);
    return params.get(parametre);
}

// ==============================================
// INITIALISATION DE L'APPLICATION
// ==============================================

document.addEventListener('DOMContentLoaded', () => {
    // Met à jour le bouton de connexion
    mettreAJourBoutonConnexion();

    // Initialise les tooltips (optionnel)
    initialiserTooltips();

    // Log de démarrage
    console.log('✅ Application OpenLearn initialisée');
});

/**
 * Initialise les tooltips
 */
function initialiserTooltips() {
    const elementsTooltip = document.querySelectorAll('[data-tooltip]');

    elementsTooltip.forEach(element => {
        element.addEventListener('mouseenter', function () {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');

            Object.assign(tooltip.style, {
                position: 'absolute',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                zIndex: '10000',
                pointerEvents: 'none',
                top: (this.offsetTop - 40) + 'px',
                left: this.offsetLeft + 'px'
            });

            document.body.appendChild(tooltip);

            this.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// Rend les fonctions accessibles globalement
window.traiterConnexion = traiterConnexion;
window.traiterInscription = traiterInscription;
window.traiterContact = traiterContact;
window.connexionSociale = connexionSociale;
window.basculerFormulaire = basculerFormulaire;
window.afficherAuthentification = afficherAuthentification;
window.scrollVers = scrollVers;
window.filtrerFormations = filtrerFormations;
window.basculerFAQ = basculerFAQ;
window.deconnecter = deconnecter;
window.afficherNotification = afficherNotification;