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
                programming: 'Programming',
                visuals: 'Visuals',
                music: 'Music'
            },
            home: {
                bio: {
                    intro: 'Hi ! My name is Clément Hennebelle, and I\'m a programmer and artist. My works include',
                    programming: 'programming',
                    gamesAndWeb: '(games & web),',
                    visuals: 'visuals',
                    and: 'and',
                    musicProduction: 'music production'
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
            programming: {
                faceaface: {
                    text1: 'This project was carried out while I worked for PLAYMIND during <i>Montréal en Lumière</i> in 2019. The core gameplay loop was a timed trial during which the players had to score the highest possible score, hitting the targets on screen with foam balls.',
                    text2: 'The game featured several power-ups, and a leaderbord which kept track of the best scores attained. The project was made on <i>Unity</i> and featured iterative gameplay life cycles.',
                    text3: 'The setup was made on Montreal\'s <i>Place des Arts</i>, and I was responsible for maintaining the code base and making necessary gameplay adjustments on-site. The game detected the ball impacts thanks to a lazer sweeping the area in front of the screen. I was also responsible for handling the lazer\'s implementation and behaviour, which came through a C++ library.',
                    text4: 'The final seconds of the game featured a \"frenzy mode\" where players would try and throw as many balls as possible on the goalkeeper.'
                },
                playbooth: {
                    text1: '<i>Playbooth</i> is a packaged interactive experience, relying on the interaction between several components to function.</p><p>The first iteration of the project was installed at E3 in 2019 through a partnership with <i>Bandai Namco</i> for their upcoming game <i>Man Of Medan</i>. It was an interactive experience integrated into a photobooth, where people would play through a sequence and have their picture taken during a jumpscare.</p><p>The system operated with a computer, a LED display, a camera which would take the picture, a printer which would print the picture within a frame, and a tablet which would get the user\'s information and send them the picture.',
                    text2: 'A later iteration of the project, <i>The Last Floor</i>, would take the concept into a post-apocalyptic setting, with hordes of zombies rushing towards the users.</p><p>This project ran on <i>Unreal Engine</i> and made use of its Timeline feature.',
                    text3: 'More information : <a href=\'https://playmind.com/products/playbooth/\' class=\"Email\">https://playmind.com/products/playbooth/</a>'
                },
                telekinesis: {
                    text1: 'A simple implementation of a telekinesis ability, wrapped inside an actor component. It\'s bound to Unreal Engine\'s Enhanced Input Component in <code>BeginPlay().</code>',
                    text2: 'From there, <code>PickUpItem()</code> handles item pickup and handling, as the player moves the mouse across the screen.',
                    text3: 'For simplicity\'s sake, I decided wether an item could be picked up or not based on if it was simulating physics. In a real game context, these objects would have their own collision channel.</p><p><code>GetPOV_Origin()</code> returns a vector with the camera\'s displacement from the actual character position.</p><p><code>ThrowItem()</code> handles throwing the held item in the aimed direction:',
                    text4: '<code>ReleaseKey()</code> and <code>ReleaseItem()</code> handle disposing of the particle VFX and re-enabling gravity for the moved item.'
                },
                blink: {
                    text1: 'An implementation of a blink ability, similar to the one in <i>Dishonored</i>. Upon initialization, we spawn the VFX directly, since its position needs to be updated every frame when deciding where to blink.',
                    text2: '<code>PickBlinkLocation()</code> handles deciding on a suitable location to blink. First, we perform a ray cast in a straight line.',
                    text3: 'Then, if we hit an actor (i.e. a wall or any vertical surface), we perform another raycast downwards, to see if there would be a suitable location on the ground for us.',
                    text4: '<code>characterRadius</code> and <code>characterHalfHeight</code> provide us with the dimensions of the character\'s capsule, which is its collision\'s shape.</p><p>The origin of the downwards raycast is set half the capsule size away from the object we hit, to avoid casting into it. When we have found a suitable location, we add the character\'s half height to position them correctly.</p><p>Now, we also want to be able to teleport onto ledges we cannot see. For this, we will perform a box cast if we don\'t hit any object, to check for a ledge underneath the cast direction.',
                    text5: 'Finally, if we found a suitable location, we display the VFX to indicate it\'s possible to blink. Upon key realease, we perform the blink.'
                },
                backToProjects: 'Back to projects'
            },
            music: {
                description: 'is a techno & hard techno project, exploring the brutality and industrialness of a dark universe filled with frenzied melodies.'
            },
            footer: {
                contact: 'Contact me',
                resume: 'Download my resume'
            }
        },
        fr : {
            pages: {
                home: 'Accueil',
                programming: 'Programmation',
                visuals: 'Visuels',
                music: 'Musique'
            },
            home: {
                bio: {
                    intro: 'Salut ! Je m\'appelle Clément Hennebelle, et je suis un programmeur et artiste. J\'ai des projets de ',
                    programming: 'programmation',
                    gamesAndWeb: '(jeux & web), de',
                    visuals: 'visuels',
                    and: 'et de',
                    musicProduction: 'production musicale'
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
            programming: {
                faceaface: {
                    text1: 'Ce projet a été réalisé pendant que je travaillais pour PLAYMIND lors de <i>Montréal en Lumière</i> en 2019. Le gameplay était un défi chronométré pendant lequel les joueurs devaient obtenir le score le plus élevé possible en frappant les cibles à l\'écran avec des balles en mousse.',
                    text2: 'Le jeu comportait plusieurs power-ups et un tableau des scores qui conservait les meilleurs scores atteints. Le projet a été réalisé sur <i>Unity</i> et comportait des boucles de gameplay itératives.',
                    text3: 'L\'installation a été faite sur la <i>Place des Arts</i> de Montréal, et j\'étais responsable de maintenir le code et d\'apporter les ajustements nécessaires au gameplay sur place, au besoin. Le jeu détectait les impacts des balles grâce à un laser balayant la zone devant l\'écran. J\'étais également responsable de la mise en œuvre et du comportement du laser, qui passait par une bibliothèque en C++.',
                    text4: 'Les dernières secondes du jeu comportaient un "mode frénézie" où les joueurs tentaient de lancer autant de balles que possible sur le gardien.'
                },
                playbooth: {
                    text1: '<i>Playbooth</i> est une expérience interactive clés en main, reposant sur l\'interaction entre plusieurs composants pour fonctionner.</p><p>La première itération du projet a été installée à l\'E3 en 2019 grâce à un partenariat avec <i>Bandai Namco</i> pour leur jeu <i>Man Of Medan</i>. C\'était une expérience interactive intégrée dans un photomaton, où les gens jouaient à une séquence et se faisaient photographier lors d\'un jumpscare.</p><p>Le système fonctionnait avec un ordinateur, un écran LED, une caméra qui prenait la photo, une imprimante qui l\'imprimait dans un cadre, et une tablette qui recueillait les informations de l\'utilisateur et leur envoyait la photo.',
                    text2: 'Une itération ultérieure du projet, <i>The Last Floor</i>, reprenait le concept dans un cadre post-apocalyptique, avec des hordes de zombies se précipitant vers les utilisateurs.</p><p>Ce projet tournait sur <i>Unreal Engine</i> et utilisait sa fonctionnalité de séquençage.',
                    text3: 'Plus d\'informations : <a href=\'https://playmind.com/products/playbooth/\' class=\"Email\">https://playmind.com/products/playbooth/</a>'
                },
                telekinesis: {
                    text1: 'Une implémentation simple d\'une capacité de télékinésie, encapsulée dans un composant d\'acteur. Elle est liée au Enhanced Input Component d\'Unreal Engine dans <code>BeginPlay().</code>',
                    text2: 'À partir de là, <code>PickUpItem()</code> gère le ramassage et la manipulation des objets, pendant que le joueur déplace la souris sur l\'écran.',
                    text3: 'Pour simplifier, j\'ai décidé si un objet pouvait être ramassé ou non en fonction de s\'il simulait la physique. Dans un vrai contexte de jeu, ces objets auraient leur propre canal de collision.</p><p><code>GetPOV_Origin()</code> renvoie un vecteur avec le déplacement de la caméra par rapport à la position réelle du personnage.</p><p><code>ThrowItem()</code> gère le lancement de l\'objet tenu dans la direction visée :',
                    text4: '<code>ReleaseKey()</code> et <code>ReleaseItem()</code> gèrent la suppression des effets VFX de particules et réactivent la gravité pour l\'objet déplacé.'
                },
                blink: {
                    text1: 'Une implémentation d\'une capacité de téléportation, similaire à celle de <i>Dishonored</i>. Lors de l\'initialisation, nous instancions directement le VFX, car sa position doit être mise à jour à chaque frame lorsque le joueur choisit son lieu de téléportation.',
                    text2: '<code>PickBlinkLocation()</code> choisit emplacement approprié pour se téléporter. Tout d\'abord, un raycast est effectué en ligne droite.',
                    text3: 'Ensuite, si il rencontre un acteur (c\'est-à-dire un mur ou une surface verticale), un autre raycast est effectué vers le bas, pour voir s\'il y a un emplacement approprié sur le sol pour le joueur.',
                    text4: '<code>characterRadius</code> et <code>characterHalfHeight</code> nous fournissent les dimensions de la capsule du personnage, qui est la forme de sa collision.</p><p>L\'origine du raycast vers le bas est placée à la moitié de la taille de la capsule, à distance de l\'objet heurté, pour éviter de détecter une collision avec celui-ci. Lorsque nous trouvons un emplacement approprié, nous ajoutons la moitié de la taille du personnage pour le positionner correctement.</p><p>Nous voulons également pouvoir nous téléporter sur des rebords que nous ne pouvons pas voir. Pour cela, nous effectuons un boxcast si nous ne heurtons aucun objet, pour vérifier s\'il y a un rebord sous la direction du lancer.',
                    text5: 'Enfin, si nous trouvons un emplacement approprié, nous affichons le VFX pour indiquons qu\'une téléportation est possible. Lorsque la touche est relâchée, nous effectuons la téléportation.'
                },
                backToProjects: 'Retour aux projets'
            }, 
            music: {
                description: 'est un projet de techno & hard techno explorant la brutalité et l\'industrialité d\'un univers sombre, empli de mélodies frénétiques.'
            },
            footer: {
                contact: 'Contactez-moi',
                resume: 'Téléchargez mon CV'
            }
        }
    }
})

export default i18next;