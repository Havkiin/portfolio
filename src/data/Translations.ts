import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(LanguageDetector)
    .init({
    fallbackLng: 'en',
    resources: {
        en: {
            sections: {
                projects: "Projects",
                experiments: "Experiments",
                about: "About",
                lang: "EN"
            },
            projects: {
                yisst: {
                    subtitle: "Local Neighborhood Pub",
                    description: "Lively local bar on a mission to provide only the best local products.",
                    seeMore: "See more",
                    role: "Role",
                    roleContent: "UX Design & Programming",
                    date: "Date",
                    visitWebsite: "Visit Website",
                    context: "Context",
                    contextContent: "Yisst wanted a full redesign of their website, to showcase their products and their mission to the clients. The pub doesnt have any paper menus, so making the menu clear and accessible to everyone was my top priority.",
                    design: "Design",
                    colors: {
                        kobicha: "Kobicha",
                        sienna: "Sienna",
                        bronze: "Bronze",
                        dune: "Dune",
                        gunmetal: "Gunmetal"
                    },
                    tech: "Tech",
                    techContent: "The main challenge with Yisst was providing a way to keep the menu dynamic, as new beers come in almost every day. I provided an internal menu linked to a database so that the staff was able to change the items easily. The integration was made using Wix as a CMS.",
                    back: "Back"
                }
            },
            experiments: {
                experiments: "Experiments",
                moonPhases: {
                    moonPhases: "Moon Phases",
                    newMoon: "New Moon",
                    waxingCrescent: "Waxing Crescent",
                    firstQuarter: "First Quarter",
                    waxingGibbous: "Waxing Gibbous",
                    fullMoon: "Full Moon",
                    waningGibbous: "Waning Gibbous",
                    lastQuarter: "Last Quarter",
                    waningCrescent: "Waning Crescent",
                    nextFullMoon: "Next full moon on "
                }
            },
            about: {
                aboutMe: "About me.",
                description1: "Im a creative programmer who makes websites and web applications, as well as some exploration in computer graphics.",
                description2: "I have a background in the video games industry where I spent a couple years building interactive fun.",
                description3: "I studied Computer Science and Digital Music, curious to learn more about my craft and the many ways to combine my love for technology and creativity.",
                description4: "I am currently looking for work and available for contracts."
            },
            contact: {
                letsTalk: "Lets talk.",
                questionProjects: "Question? Projects? Just want to meet up?",
                name: "Name*",
                email: "Email*",
                message: "Message*",
                send: "Send",
                messageSent1: "Your message was sent!",
                messageSent2: "Ill get back to you as soon as possible."
            },
            general: {
                backToTop: "BACK TO TOP"
            }
        },
        fr : {
            sections: {
                projects: "Projets",
                experiments: "Expériences",
                about: "À propos",
                lang: "FR"
            },
            projects: {
                yisst: {
                    subtitle: "Pub de quartier local",
                    description: "Bar local animé ayant pour mission de proposer uniquement les meilleurs produits locaux.",
                    seeMore: "Voir plus",
                    role: "Rôle",
                    roleContent: "Design UX & Programmation",
                    date: "Date",
                    visitWebsite: "Visiter le site",
                    context: "Contexte",
                    contextContent: "Le Yisst souhaitait une refonte complète de leur site web, afin de mettre en valeur leurs produits et leur mission auprès de leurs clients. Le pub n'utilise aucun menu papier, rendre le menu clair et accessible à tous était donc ma plus grande priorité.",
                    design: "Design",
                    colors: {
                        kobicha: "Kobicha",
                        sienna: "Terre de Sienne",
                        bronze: "Bronze",
                        dune: "Dune",
                        gunmetal: "Gunmetal"
                    },
                    tech: "Technologie",
                    techContent: "Le principal défi avec le Yisst était de fournir un moyen de garder le menu dynamique, car les bières sont changées presque tous les jours. J'ai proposé un menu interne lié à une base de données afin que le personnel puisse modifier les éléments facilement. L'intégration a été réalisée en utilisant Wix comme CMS.",
                    back: "Retour"
                }
            },
            experiments: {
                experiments: "Expériences",
                moonPhases: {
                    moonPhases: "Phases de la lune",
                    newMoon: "Nouvelle lune",
                    waxingCrescent: "Premier croissant",
                    firstQuarter: "Premier quartier",
                    waxingGibbous: "Gibbeuse croissante",
                    fullMoon: "Pleine lune",
                    waningGibbous: "Gibbeuse décroissante",
                    lastQuarter: "Dernier quartier",
                    waningCrescent: "Dernier croissant",
                    nextFullMoon: "Prochaine pleine lune le "
                }
            },
            about: {
                aboutMe: "À propos de moi.",
                description1: "Je suis un programmeur créatif qui crée des sites web et des applications web, tout en explorant l'art visuel informatique.",
                description2: "J'ai de expérience dans l'industrie du jeu vidéo, où j'ai passé quelques années à concevoir des expériences interactives engageantes.",
                description3: "J'ai étudié l'informatique et la musique numérique, curieux d'en apprendre davantage sur mon domaine et sur les nombreuses façons de combiner mes passions pour la technologie et la créativité.",
                description4: "Je suis actuellement à la recherche de travail et disponible pour des contrats."
            },
            contact: {
                letsTalk: "Discutons.",
                questionProjects: "Une question ? Des projets ? Vous voulez simplement discuter ?",
                name: "Nom*",
                email: "Email*",
                message: "Message*",
                send: "Envoyer",
                messageSent1: "Votre message a été envoyé !",
                messageSent2: "Je vous répondrai dès que possible."
            },
            general: {
                backToTop: "HAUT DE PAGE"
            }
        }
    }
})

export default i18next;