export enum ProjectType {
    Programming = 'Programming',
    Visuals = 'Visuals',
    Music = 'Music',
}

export enum ProgrammingProjectType {
    All = 'All',
    Gameplay = 'Gameplay',
    Interactive = 'Interactive',
    Web = 'Web',    
}

export type ProgrammingProject = {
    id: number,
    name: string,
    banner: string,
    codeblocks: string[],
    images: string[],
    texts: string[],
    type: ProgrammingProjectType,
}
  
export const programmingProjects : ProgrammingProject[] = [
    {
        id: 0,
        name: 'Défi Face à Face',
        banner: '/FaceAFace_1.png',
        texts: [
            'This project was carried out while I worked for PLAYMIND during <i>Montréal en Lumière</i> in 2019. The core gameplay loop was a timed trial during which the players had to score the highest possible score, hitting the targets on screen with foam balls.',
            'The game featured several power-ups, and a leaderbord which kept track of the best scores attained. The project was made on <i>Unity</i> and featured iterative gameplay life cycles.',
            'The setup was made on Montreal\'s <i>Place des Arts</i>, and I was responsible for maintaining the code base and making necessary gameplay adjustments on-site. The game detected the ball impacts thanks to a lazer sweeping the area in front of the screen. I was also responsible for handling the lazer\'s implementation and behaviour, which came through a C++ library.',
            'The final seconds of the game featured a \"frenzy mode\" where players would try and throw as many balls as possible on the goalkeeper.'
        ],
        codeblocks: [],
        images: ['/FaceAFace_5.png', '/FaceAFace_2.jpg', '/FaceAFace_3.png', '/FaceAFace_4.png'],
        type: ProgrammingProjectType.Interactive,
    },
    {
        id: 1,
        name: 'Playbooth',
        banner: '/Playbooth.png',
        texts: [
            '<i>Playbooth</i> is a packaged interactive experience, relying on the interaction between several components to function.</p><p>The first iteration of the project was installed at E3 in 2019 through a partnership with <i>Bandai Namco</i> for their upcoming game <i>Man Of Medan</i>. It was an interactive experience integrated into a photobooth, where people would play through a sequence and have their picture taken during a jumpscare.</p><p>The system operated with a computer, a LED display, a camera which would take the picture, a printer which would print the picture within a frame, and a tablet which would get the user\'s information and send them the picture.',
            'A later iteration of the project, <i>The Last Floor</i>, would take the concept into a post-apocalyptic setting, with hordes of zombies rushing towards the users.</p><p>This project ran on <i>Unreal Engine</i> and made use of its Timeline feature.',
            'More information : <a href=\'https://playmind.com/products/playbooth/\'>https://playmind.com/products/playbooth/</a>'
        ],
        codeblocks: [],
        images: ['/ManOfMedan_E3.png', '/TheLastFloor_ingame.png'],
        type: ProgrammingProjectType.Interactive
    },
    {
        id: 2,
        name: 'Telekinesis',
        banner: '/Telekinesis.gif',
        codeblocks: [
            "void UTelekinesisComponent::BeginPlay()\n{\n\t// Check for validity of components\n\t// ...\n\n\tEnhancedInputComponent->BindAction(PickUpAction, ETriggerEvent::Triggered, this, &UTelekinesisComponent::PickUpItem);\n\tEnhancedInputComponent->BindAction(PickUpAction, ETriggerEvent::Completed, this, &UTelekinesisComponent::ReleaseKey);\n\tEnhancedInputComponent->BindAction(ThrowAction, ETriggerEvent::Triggered, this, &UTelekinesisComponent::ThrowItem);\n}",
            "void UTelekinesisComponent::PickUpItem(const FInputActionValue& Value)\n{\n\tif (bIsHoldingKey && !bIsMovingItem)\n\t\treturn;\n\n\tbIsHoldingKey = true;\n\n\tAPawn* PawnOwner = Cast<APawn>(GetOwner());\n\tif (!IsValid(PawnOwner))\n\t\treturn;\n\n\tAAreWeBackReloadedCharacter* ProjectCharacter = Cast<AAreWeBackReloadedCharacter>(PawnOwner);\n\tif (!IsValid(ProjectCharacter))\n\t\treturn;\n\n\tif (bIsMovingItem)\n\t{\n\t\tFVector NewLocation = PawnOwner->GetActorLocation() + ProjectCharacter->GetPOV_Origin() + PawnOwner->GetControlRotation().Vector() * DistanceToItem.Length();\n\n\t\tMovedItem->SetActorLocation(NewLocation);\n\t\tSpawnedComponent->SetWorldLocation(NewLocation);\n\t}\n\telse\n\t{\n\t\tFHitResult Hit;\n\n\t\tFVector TraceStart = PawnOwner->GetActorLocation() + ProjectCharacter->GetPOV_Origin();\n\t\tFVector TraceEnd = PawnOwner->GetActorLocation() + ProjectCharacter->GetPOV_Origin() + PawnOwner->GetControlRotation().Vector() * PickUpRange;\n\n\t\tFCollisionQueryParams QueryParams;\n\t\tQueryParams.AddIgnoredActor(PawnOwner);\n\n\t\tGetWorld()->LineTraceSingleByChannel(Hit, TraceStart, TraceEnd, ECollisionChannel::ECC_Pawn, QueryParams);\n\n\t\tif (Hit.bBlockingHit && Hit.GetActor()->GetRootComponent()->IsSimulatingPhysics())\n\t\t{\n\t\t\tMovedItem = Hit.GetActor();\n\t\t\tDistanceToItem = MovedItem->GetActorLocation() - TraceStart;\n\t\t\tbIsMovingItem = true;\n\n\t\t\tUPrimitiveComponent* Component = Cast<UPrimitiveComponent>(MovedItem->GetRootComponent());\n\t\t\tif (IsValid(Component))\n\t\t\t{\n\t\t\t\tComponent->SetEnableGravity(false);	\n\t\t\t\tSpawnedComponent = UNiagaraFunctionLibrary::SpawnSystemAtLocation(this, MoveParticleSystem, MovedItem->GetActorLocation(), MovedItem->GetActorRotation());\n\t\t\t}\n\t\t}\n\t}\n}",
            "void UTelekinesisComponent::ThrowItem(const FInputActionValue& Value)\n{\n\tif (bIsMovingItem && IsValid(MovedItem))\n\t{\n\t\tUPrimitiveComponent* Component = Cast<UPrimitiveComponent>(MovedItem->GetRootComponent());\n\t\tAAreWeBackReloadedCharacter* ProjectCharacter = Cast<AAreWeBackReloadedCharacter>(GetOwner());\n\t\tif (IsValid(Component) && IsValid(ProjectCharacter))\n\t\t{\n\t\t\tFVector Direction = MovedItem->GetActorLocation() - ProjectCharacter->GetActorLocation() - ProjectCharacter->GetPOV_Origin();\n\t\t\tDirection.Normalize();\n\t\t\tFVector ImpulseApplied = Direction * ThrowForce;\n\n\t\t\tReleaseItem();\n\t\t\tComponent->AddImpulse(ImpulseApplied);\n\t\t}\n\t}\n}",
            "void UTelekinesisComponent::ReleaseKey(const FInputActionValue& Value)\n{\n\tbIsHoldingKey = false;\n\tReleaseItem();\n}\n\nvoid UTelekinesisComponent::ReleaseItem()\n{\n\tbIsMovingItem = false;\n\n\tif (IsValid(MovedItem))\n\t{\n\t\tUPrimitiveComponent* Component = Cast<UPrimitiveComponent>(MovedItem->GetRootComponent());\n\t\tif (IsValid(Component))\n\t\t{\n\t\t\tComponent->SetEnableGravity(true);\n\t\t\tSpawnedComponent->DestroyInstance();\n\t\t}\n\t}\n}"
        ],
        images: [],
        texts: [
            'A simple implementation of a telekinesis ability, wrapped inside an actor component. It\'s bound to Unreal Engine\'s Enhanced Input Component in <code>BeginPlay().</code>',
            'From there, <code>PickUpItem()</code> handles item pickup and handling, as the player moves the mouse across the screen.',
            'For simplicity\'s sake, I decided wether an item could be picked up or not based on if it was simulating physics. In a real game context, these objects would have their own collision channel.</p><p><code>GetPOV_Origin()</code> returns a vector with the camera\'s displacement from the actual character position.</p><p><code>ThrowItem()</code> handles throwing the held item in the aimed direction:',
            '<code>ReleaseKey()</code> and <code>ReleaseItem()</code> handle disposing of the particle VFX and re-enabling gravity for the moved item.'
        ],
        type: ProgrammingProjectType.Gameplay,
    },
    {
        id: 3,
        name: 'Blink',
        banner: '/Blink.gif',
        codeblocks: [
            "void UBlinkComponent::BeginPlay()\n{\n\t// Check for validity of components\n\t// ...\n\n\tEnhancedInputComponent->BindAction(BlinkAction, ETriggerEvent::Triggered, this, &UBlinkComponent::PickBlinkLocation);\n\tEnhancedInputComponent->BindAction(BlinkAction, ETriggerEvent::Completed, this, &UBlinkComponent::Blink);\n\n\tSpawnedComponent = UNiagaraFunctionLibrary::SpawnSystemAtLocation(this, BlinkParticleSystem, FVector::ZeroVector, FRotator::ZeroRotator);\n\tSpawnedComponent->SetVisibility(false, true);\n}",
            "void UBlinkComponent::PickBlinkLocation()\n{\n\tAPawn* PawnOwner = Cast<APawn>(GetOwner());\n\tif (!IsValid(PawnOwner))\n\t\treturn;\n\n\tAAreWeBackReloadedCharacter* ProjectCharacter = Cast<AAreWeBackReloadedCharacter>(PawnOwner);\n\tif (!IsValid(ProjectCharacter))\n\t\treturn;\n\n\tFHitResult BlockingHit;\n\tFVector CameraOffset = ProjectCharacter->GetPOV_Origin();\n\n\tFVector BlockingTraceStart = PawnOwner->GetActorLocation() + CameraOffset;\n\tFVector BlockingTraceEnd = PawnOwner->GetActorLocation() + CameraOffset + PawnOwner->GetControlRotation().Vector() * BlinkRange;\n\n\tFCollisionQueryParams QueryParams;\n\tQueryParams.AddIgnoredActor(PawnOwner);\n\n\tGetWorld()->LineTraceSingleByChannel(BlockingHit, BlockingTraceStart, BlockingTraceEnd, ECollisionChannel::ECC_Pawn, QueryParams);\n\n\t// ...\n}",
            "void UBlinkComponent::PickBlinkLocation()\n{\n\t// ...\n\n\tFHitResult BlinkHit;\n\tFVector BlinkTraceStart = BlockingTraceEnd;\n\n\tfloat characterRadius = ProjectCharacter->GetCapsuleRadius();\n\tfloat characterHalfHeight = ProjectCharacter->GetCapsuleHalfHeight();\n\n\t// If we hit an actor, perform a raycast downwards\n\tif (BlockingHit.GetActor())\n\t{\n\t\tBlinkTraceStart = BlockingHit.Location;\n\n\t\tFVector CapsuleOffset = BlinkTraceStart - BlockingTraceStart;\n\t\tCapsuleOffset.Normalize();\n\t\tCapsuleOffset *= characterRadius;\n\n\t\tBlinkTraceStart -= CapsuleOffset;\n\n\t\tFVector BlinkTraceEnd = BlinkTraceStart + FVector::DownVector * 350.0f;\n\n\t\tbool bHit = GetWorld()->LineTraceSingleByChannel(BlinkHit, BlinkTraceStart, BlinkTraceEnd, ECollisionChannel::ECC_Pawn, QueryParams);\n\n\t\tif (bHit)\n\t\t{\n\t\t\tBlinkLocation = BlinkHit.Location + FVector(0.0f, 0.0f, characterHalfHeight);\n\t\t}\n\t}\n}",
            "void UBlinkComponent::PickBlinkLocation()\n{\n\t// ...\n\n\tif (BlockingHit.GetActor())\n\t{\n\t\t// ...\n\t}\n\t// Otherwise, perform a box sweep starting from the actor location, to find blink locations along the way\n\telse\n\t{\n\t\tFVector BoxHalfSize = FVector(characterRadius, characterRadius, characterHalfHeight);\n\t\tbool bHit = GetWorld()->SweepSingleByChannel(BlinkHit, BlockingTraceStart, BlockingTraceEnd, FQuat::Identity, ECollisionChannel::ECC_Pawn, FCollisionShape::MakeBox(BoxHalfSize), QueryParams);\n\n\t\tif (bHit)\n\t\t{\n\t\t\tFVector CapsuleOffset = BlockingTraceEnd - BlockingTraceStart;\n\t\t\tCapsuleOffset.Normalize();\n\t\t\tCapsuleOffset *= characterRadius * 2.0f;\n\n\t\t\tBlinkLocation = BlinkHit.Location + CapsuleOffset;\n\t\t}\n\t}\n}",
            "void UBlinkComponent::PickBlinkLocation()\n{\n\t// ...\n\n\tif (BlinkHit.bBlockingHit)\n\t{\n\t\tbIsBlinkValid = true;\n\t\tSpawnedComponent->SetWorldLocation(BlinkLocation - FVector(0.0f, 0.0f, characterHalfHeight));\n\t}\n\telse\n\t{\n\t\tbIsBlinkValid = false;\n\t}\n\n\tSpawnedComponent->SetVisibility(bIsBlinkValid, true);\n}\n\nvoid UBlinkComponent::Blink()\n{\n\tif (!bIsBlinkValid)\n\t\treturn;\n\n\tAPawn* PawnOwner = Cast<APawn>(GetOwner());\n\tif (IsValid(PawnOwner))\n\t{\n\t\tPawnOwner->SetActorLocation(BlinkLocation);\n\t\tbIsBlinkValid = false;\n\t\tSpawnedComponent->SetVisibility(false, true);\n\t}\n}",
        ],
        images: [],
        texts: [
            'An implementation of a blink ability, similar to the one in <i>Dishonored</i>. Upon initialization, we spawn the VFX directly, since its position needs to be updated every frame when deciding where to blink.',
            '<code>PickBlinkLocation()</code> handles deciding on a suitable location to blink. First, we perform a ray cast in a straight line.',
            'Then, if we hit an actor (i.e. a wall or any vertical surface), we perform another raycast downwards, to see if there would be a suitable location on the ground for us.',
            '<code>characterRadius</code> and <code>characterHalfHeight</code> provide us with the dimensions of the character\'s capsule, which is its collision\'s shape.</p><p>The origin of the downwards raycast is set half the capsule size away from the object we hit, to avoid casting into it. When we have found a suitable location, we add the character\'s half height to position them correctly.</p><p>Now, we also want to be able to teleport onto ledges we cannot see. For this, we will perform a box cast if we don\'t hit any object, to check for a ledge underneath the cast direction.',
            'Finally, if we found a suitable location, we display the VFX and indicate it\'s possible to blink. Upon key realease, we perform the blink.',
        ],
        type: ProgrammingProjectType.Gameplay,
    },
]

export type VisualProject = {
    id: number,
    name: string,
    source: string,
    description: string
}

export const visualProjects : VisualProject[] = [
    {
        id: 0,
        name: 'The Big Quiet.',
        source: '/thebigquiet.mp4',
        description: 'A silence often contains many others</p><p>One trumps them all however -</p><p>it is heavier, ripe with meaning.</p><p>It is all things left unsaid</p><p>coming to fruition in an immovable mass'
    },
    {
        id: 1,
        name: 'Myth of Scarcity.',
        source: '/myth_of_scarcity.mp4',
        description: 'When are we ever truly alone?</p><p>When we are convinced that</p><p>we have seen it all</p><p>When we think</p><p>of the bread of life</p><p>only crumbs are left'
    },
    {
        id: 2,
        name: 'Beyond. (live)',
        source: '/beyond_(live).mp4',
        description: 'As we gaze in wonder</p><p>upon the stars</p><p>A voice always seem to beckon</p><p>Urging us to reach for what</p><p>is ever just out of our grasp'
    },
    {
        id: 3,
        name: 'Transmutations. (live)',
        source: '/transmutations_(live).mp4',
        description: 'Change is all we ever will be</p><p>To grasp on to a rigid state is to already</p><p>belong to the realm of the departed</p><p>What then to do with ourselves?</p><p>Act, adapt, transcend'
    }
]

export type MusicProject = {
    id: number,
    name: string,
    source: string,
}

export const musicProjects : MusicProject[] = [
    {
        id: 0,
        name: 'NULL ENTRY',
        source: 'https://open.spotify.com/embed/album/4KsyxNZzR68Mh7gkDSszVH?utm_source=generator',
    },
    {
        id: 1,
        name: 'Losing My Mind',
        source: 'https://open.spotify.com/embed/album/5WD7GWfDfAGkabgSxrF0Yd?utm_source=generator',
    },
    {
        id: 2,
        name: 'Memento Inferni',
        source: 'https://open.spotify.com/embed/album/7igEUVmcPHlyl7S0fdv3t5?utm_source=generator&theme=0',
    },
]

export type ResumeItem = {
    image: string,
    link: string,
    title: string,
    years: string,
    description: string
}
  
export const resume : ResumeItem[] = [
    {
        image: '/Concordia_logo.svg',
        link: 'https://www.concordia.ca',
        title: 'Bachelor\'s Degree\nComputer Science',
        years: '2014 - 2018',
        description: "• Learned the basics of programming & computer science\n• Specialized in Computer Games",
    },
    {
        image: '/Playmind_logo.png',
        link: 'http://playmind.com/',
        title: 'Gameplay & Systems\nProgrammer',
        years: '2018 - 2019',
        description: '• Experience with Unity 3D (C#)\n• Worked on developping and maintaining numerical installations & game projects\n• Learned how to iterate rapidly upon client feedback, and handle issues when projects are live',
    },
    {
        image: '/Behaviour_logo.svg',
        link: 'https://www.bhvr.com/',
        title: 'Gameplay\nProgrammer',
        years: '2019 - 2020',
        description: '• Worked on an unreleased Stadia project\n• Experience with Unreal Engine\'s Gameplay Ability System (C++ and Blueprint)\n• Experience with multiplayer gameplay through Unreal Engine\'s Replication system',
    },
    {
        image: '/Udem_logo.svg',
        link: 'https://www.umontreal.ca/',
        title: 'Major\nDigital Music',
        years: '2021 - 2024',
        description: '• Expanded my creative abilities through the exploration of sound and sound systems\n• Created multiple projects and performances with TouchDesigner, Ableton Live, Wwise',
    },
]
