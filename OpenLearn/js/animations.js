/**
 * Gestion des animations et interactions OpenLearn
 */

/**
 * Initialise les animations au scroll
 */
function initialiserAnimationsScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Ajoute l'observation à tous les éléments animables
    document.querySelectorAll(
        '.avantage-carte, .parcours-carte, .formation-carte, .etape, .stat-carte, .format-carte'
    ).forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

/**
 * Ajoute les styles CSS pour les animations
 */
function ajouterStylesAnimations() {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }

        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .parcours-carte:nth-child(2) {
            transition-delay: 0.1s;
        }

        .parcours-carte:nth-child(3) {
            transition-delay: 0.2s;
        }

        .parcours-carte:nth-child(4) {
            transition-delay: 0.3s;
        }

        .formation-carte:nth-child(2) {
            transition-delay: 0.1s;
        }

        .formation-carte:nth-child(3) {
            transition-delay: 0.2s;
        }

        .formation-carte:nth-child(4) {
            transition-delay: 0.3s;
        }

        .avantage-carte:nth-child(2) {
            transition-delay: 0.1s;
        }

        .avantage-carte:nth-child(3) {
            transition-delay: 0.2s;
        }

        .avantage-carte:nth-child(4) {
            transition-delay: 0.1s;
        }

        .avantage-carte:nth-child(5) {
            transition-delay: 0.2s;
        }

        .avantage-carte:nth-child(6) {
            transition-delay: 0.3s;
        }
    `;
    document.head.appendChild(styleSheet);
}

/**
 * Initialise les interactions des cartes
 */
function initialiserInteractionsCartes() {
    // Effet hover sur les cartes
    document.querySelectorAll('.parcours-carte, .formation-carte, .avantage-carte').forEach(carte => {
        carte.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        carte.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Initialise le déverrouillage des FAQ
 */
function initialiserFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Ferme les autres FAQ ouvertes
                faqItems.forEach(autreItem => {
                    if (autreItem !== item) {
                        autreItem.classList.remove('ouvert');
                    }
                });

                // Bascule l'état de la FAQ actuelle
                item.classList.toggle('ouvert');
            });
        }
    });
}

/**
 * Bascule une FAQ (utilisé par les clics)
 * @param {HTMLElement} element - L'élément de la question
 */
function basculerFAQ(element) {
    const parent = element.parentElement;
    parent.classList.toggle('ouvert');

    // Ferme les autres FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
            item.classList.remove('ouvert');
        }
    });
}

/**
 * Initialise le filtrage des formations
 */
function initialiserFiltres() {
    const boutonsFiltre = document.querySelectorAll('.filtre-btn');
    boutonsFiltre.forEach(btn => {
        btn.addEventListener('click', () => {
            const niveau = btn.getAttribute('data-niveau') || btn.textContent.toLowerCase();
            filtrerFormations(niveau);
        });
    });
}

/**
 * Filtre les formations par niveau
 * @param {string} niveau - Le niveau à filtrer
 */
function filtrerFormations(niveau) {
    const formations = document.querySelectorAll('.formation-carte');
    const boutonsFiltre = document.querySelectorAll('.filtre-btn');

    // Met à jour les boutons actifs
    boutonsFiltre.forEach(btn => btn.classList.remove('actif'));
    event.target.classList.add('actif');

    // Affiche/cache les formations
    formations.forEach(formation => {
        const niveauFormation = formation.getAttribute('data-niveau');

        if (niveau === 'tous' || niveauFormation === niveau) {
            formation.style.display = 'block';
            setTimeout(() => {
                formation.style.opacity = '1';
                formation.style.transform = 'scale(1)';
            }, 10);
        } else {
            formation.style.opacity = '0';
            formation.style.transform = 'scale(0.95)';
            setTimeout(() => {
                formation.style.display = 'none';
            }, 300);
        }
    });
}

/**
 * Initialise les formulaires
 */
function initialiserFormulaires() {
    // Gestion du formulaire de connexion
    const formConnexion = document.getElementById('form-connexion');
    if (formConnexion) {
        formConnexion.addEventListener('submit', traiterConnexion);
    }

    // Gestion du formulaire d'inscription
    const formInscription = document.getElementById('form-inscription');
    if (formInscription) {
        formInscription.addEventListener('submit', traiterInscription);
    }

    // Gestion du formulaire de contact
    const formContact = document.querySelector('form[onsubmit*="traiterContact"]');
    if (formContact) {
        formContact.addEventListener('submit', traiterContact);
    }
}

/**
 * Initialise les entrées (inputs) avec animation
 */
function initialiserEntrees() {
    const entrees = document.querySelectorAll('input, textarea, select');

    entrees.forEach(entree => {
        // Ajoute une classe si la valeur existe
        if (entree.value) {
            entree.parentElement.classList.add('active');
        }

        entree.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        entree.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
            if (this.value) {
                this.parentElement.classList.add('active');
            } else {
                this.parentElement.classList.remove('active');
            }
        });
    });
}

/**
 * Crée un effet de notification
 * @param {string} message - Le message à afficher
 * @param {string} type - Le type (success, error, info)
 */
function afficherNotification(message, type = 'info') {
    // Crée un conteneur de notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Ajoute des styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '1rem 1.5rem',
        background: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#4F46E5',
        color: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        zIndex: '9999',
        animation: 'slideDown 0.3s ease-out',
        fontWeight: '600'
    });

    document.body.appendChild(notification);

    // Disparaît après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Initialise les boutons d'inscription aux parcours
 */
function initialiserBoutonsInscription() {
    window.inscrisParcours = function (nomParcours) {
        afficherNotification(`Redirection vers inscription pour ${nomParcours}...`, 'info');
        setTimeout(() => {
            window.location.href = 'authentification.html';
        }, 500);
    };

    window.inscrireFormation = function (nomFormation) {
        afficherNotification(`Redirection vers inscription pour ${nomFormation}...`, 'info');
        setTimeout(() => {
            window.location.href = 'authentification.html';
        }, 500);
    };
}

/**
 * Initialise tous les effets de parallaxe
 */
function initialiserParallaxe() {
    const elementsParallaxe = document.querySelectorAll('.hero-illustration');

    window.addEventListener('scroll', () => {
        elementsParallaxe.forEach(element => {
            const scrollPosition = window.pageYOffset;
            element.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    });
}

/**
 * Initialise tous les effets de compteur pour les statistiques
 */
function initialiserCompteurs() {
    const statCartes = document.querySelectorAll('.stat-carte');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nombre = entry.target.querySelector('.stat-nombre');
                if (nombre && !nombre.dataset.counted) {
                    animerCompteur(nombre);
                    nombre.dataset.counted = 'true';
                }
            }
        });
    }, observerOptions);

    statCartes.forEach(carte => observer.observe(carte));
}

/**
 * Anime un compteur de 0 à sa valeur finale
 * @param {HTMLElement} element - L'élément du compteur
 */
function animerCompteur(element) {
    const texteOriginal = element.textContent;
    const nombre = parseInt(texteOriginal.replace(/\D/g, ''));
    const suffix = texteOriginal.replace(/[0-9]/g, '');

    let valeurActuelle = 0;
    const increment = nombre / 30; // Sur 30 frames

    const interval = setInterval(() => {
        valeurActuelle += increment;
        if (valeurActuelle >= nombre) {
            element.textContent = nombre + suffix;
            clearInterval(interval);
        } else {
            element.textContent = Math.floor(valeurActuelle) + suffix;
        }
    }, 20);
}

/**
 * Initialise tous les événements au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', () => {
    // Ajoute les styles des animations
    ajouterStylesAnimations();

    // Initialise tous les systèmes
    initialiserAnimationsScroll();
    initialiserInteractionsCartes();
    initialiserFAQ();
    initialiserFiltres();
    initialiserFormulaires();
    initialiserEntrees();
    initialiserBoutonsInscription();
    initialiserParallaxe();
    initialiserCompteurs();

    console.log(' Animations OpenLearn initialisées avec succès');
});