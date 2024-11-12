import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
    .use(LanguageDetector)
    .init({
    fallbackLng: 'en',
    resources: {
        en: {
            pages: {
                home: 'Home',
                projects: 'Projects',
                visuals: 'Visuals',
                music: 'Music'
            },
            home: {
                bio: {
                    intro: 'Hi ! My name is Clément Hennebelle, and I\'m a programmer. Check out my',
                    projects: 'projects',
                    here: 'here!'
                },
                resume: {
                    career: 'CAREER',
                    concordia: '• Learned the basics of programming & computer science\n• Specialized in Computer Games',
                    playmind: '• Experience with Unity 3D (C#)\n• Worked on developping and maintaining numerical installations & game projects\n• Learned how to iterate rapidly upon client feedback, and handle issues when projects are live',
                    behaviour: '• Worked on an unreleased Stadia project\n• Experience with Unreal Engine\'s Gameplay Ability System (C++ and Blueprint)\n• Experience with multiplayer gameplay through Unreal Engine\'s Replication system',
                    udem: '• Created multiple projects and performances with TouchDesigner, Ableton Live, Wwise\n• Expanded my creative abilities through the exploration of sound and sound systems'
                },
                contact: {
                    hi: 'SAY HI',
                    description: 'I am currently looking for a new challenge! If you think we\'d be a good fit working together, or have any questions, you can reach me here.'
                }
            },
            projects: {
                sourceCode: 'Source code',
                gameplayAbilities: {
                    intro: 'An implementation of gameplay abilities within a simple game loop, with some data tracking.',
                    text1: ''
                },
                abilities: {
                    intro: 'An implementation of gameplay abilities within a simple game loop, with some data tracking.',
                    title1: 'Telekinesis Component',
                    title2: 'Blink Component',
                    title3: 'Data handling',
                    title4: 'Level select',
                    text1: 'The Telekinesis Componennt allows the player to pick up cubes, move them around and throw them. Players lose hold of the cube when it gets further than a certain angle from the aim direction.',
                    text2: 'The Blink Component allows the player to teleport. Upon right click, the player can pick a teleport location. When the button is released, the player teleports to the chosen location. The ability supports teleporting against walls, and over ledges.',
                    text3: 'The level end screen displays information about the level, such as how long it took to be completed, what the best completion time is, and if the level was completed without Blink, Telekinesis, or either.',
                    text4: 'The game features a level select menu, which is automatically populated with new levels as soon as they are completed.'
                },
                fish: {
                    intro: 'An implementation of a fish moving using procedural animations and rendered dynamically through shaders.',
                    title1: 'Joints',
                    title2: 'Spine Generator',
                    title3: 'Movement Component',
                    title4: 'Shader',
                    text1: 'The body of the fish is made out of joints, whose position are updated according to a bone size (vector length) which is the distance between two joints.',
                    text2: 'The Spine Generator holds a reference to all the joints and constrains the joints\' position to a maximum angle, to avoid body distortion.',
                    text3: 'The Movement Component defines the movement of the fish. I implemented a wander algorithm for a simple, natural looking movement.',
                    text4: 'A sine function is applied to the movement of the head to give a natural wiggle to the movement.',
                    text5: 'Sensors on both side of the head check for collisions with the screen border, and adjust direction based on the collision side.',
                    text6: 'The fish\'s shader draws each element of the fish by checking if the fragment\'s position is within said element. The outline uses a Catmull-Rom spline algorithm to determine that.',
                    text7: 'For filling the inside of the fish\'s body, we use the ray-casting method to determine if the point is within the body\'s polygon.',
                    text8: 'We use the ellipse equation to determine if the fragment is inside a fin, and a simple radius to determine if it belongs to an eye. Then, we conditonaly draw each of the fragments.'
                },
                backToProjects: 'Back to projects'
            },
            footer: {
                contact: 'Contact me',
                resume: 'Download my resume'
            }
        },
        fr : {
            pages: {
                home: 'Accueil',
                projects: 'Projets',
                visuals: 'Visuels',
                music: 'Musique'
            },
            home: {
                bio: {
                    intro: 'Salut ! Je m\'appelle Clément Hennebelle, et je suis un programmeur. Regardez mes ',
                    projects: 'projets',
                    here: ' ici !'
                },
                resume: {
                    career: 'CARRIÈRE',
                    concordia: '• Apprentissage des bases de la programmation et de l\'informatique\n• Spécialisation en jeux vidéo',
                    playmind: '• Expérience avec Unity 3D (C#)\n• Développer et maintenir des projets d\'installation numériques & de jeux\n• Itération rapide suivant les retours des clients, et gestion des problèmes techniques quand les projets sont installés',
                    behaviour: '• Travail sur un projet Stadia non publié\n• Expérience avec le Gameplay Ability System d\'Unreal Engine (C++ et Blueprint)\n• Expérience avec du gameplay multijoueur au travers du sytème de réplication d\'Unreal Engine',
                    udem: '• Création de multiples projets et performances avec TouchDesigner, Ableton Live, Wwise\n• Exploration de mes capacités créatives au travers de l\'exploration des sons et des systèmes sonores'
                },
                contact: {
                    hi: 'DITES BONJOUR',
                    description: 'Je suis actuellement à la recherche d\'un nouveau défi ! Si vous pensez que nous pourrions travailler ensemble, ou si vous avez des questions, vous pouvez me contacter ici.'
                }
            },
            projects: {
                sourceCode: 'Code source',
                abilities: {
                    intro: "Une implémentation de capacités gameplay dans une boucle de jeu simple, avec un suivi de certaines données.",
                    title1: 'Telekinesis Component',
                    title2: 'Blink Component',
                    title3: 'Gestion des données',
                    title4: 'Sélection des niveaux',
                    text1: "Le Telekinesis Component permet au joueur de saisir des cubes, de les déplacer et de les lancer. Le joueur perd le contrôle du cube lorsqu'il dépasse un certain angle par rapport à la direction visée.",
                    text2: "Le Blink Component permet au joueur de se téléporter. En cliquant droit, le joueur peut choisir un lieu de téléportation. Lorsque le bouton est relâché, le joueur se téléporte à l'endroit choisi. Cette capacité permet de se téléporter contre des murs et au-dessus de rebords.",
                    text3: "L'écran de fin de niveau affiche des informations sur le niveau, comme le temps écoulé, le meilleur temps réalisé, et si le niveau a été complété sans utiliser la téléportation, la télékinésie, ou aucun des deux.",
                    text4: "Le jeu dispose d'un menu de sélection de niveau, qui se remplit automatiquement avec les nouveaux niveaux dès qu'ils sont terminés."
                  },
                fish: {
                    intro: "Une implémentation d'un poisson se déplaçant grâce à des animations procédurales et affiché dynamiquement via des shaders.",
                    title1: 'Joints',
                    title2: 'Spine Generator',
                    title3: 'Movement Component',
                    title4: 'Shader',
                    text1: "Le corps du poisson est composé d'articulations, dont la position est mise à jour en fonction de la taille de l'os (longueur du vecteur), qui est la distance entre deux articulations.",
                    text2: "Spine Generator contient une référence à toutes les articulations et contraint leur position à un angle maximal pour éviter la distorsion du corps.",
                    text3: "Movement Component gère le déplacement du poisson. J'ai implémenté un algorithme de Wander pour un mouvement simple et naturel.",
                    text4: "Une fonction sinusoïdale est appliquée au mouvement de la tête pour donner une ondulation naturelle.",
                    text5: "Des capteurs de chaque côté de la tête détectent les collisions avec les bords de l'écran et ajustent la direction en fonction du côté de la collision.",
                    text6: "Le shader du poisson dessine chaque élément en vérifiant si la position du fragment se trouve dans cet élément. Le contour utilise un algorithme de spline Catmull-Rom pour le déterminer.",
                    text7: "Pour remplir l'intérieur du corps du poisson, nous utilisons un algorithme de raycasting pour vérifier si le point se trouve dans le polygone du corps.",
                    text8: "Nous utilisons l'équation de l'ellipse pour déterminer si le fragment se trouve dans une nageoire, et un simple rayon pour déterminer s'il appartient à un œil. Ensuite, nous dessinons chacun des fragments en fonction des résultats."
                },
                backToProjects: 'Retour aux projets'
            },
            footer: {
                contact: 'Contactez-moi',
                resume: 'Téléchargez mon CV'
            }
        }
    }
})

export default i18next;