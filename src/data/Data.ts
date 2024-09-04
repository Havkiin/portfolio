export enum Routes {
    default = '/',
    home = '/home',
    programming = '/programming',
    visuals = '/visuals',
    music = '/music',
}

export type Route = {
    id: number,
    path: Routes,
    translateKey: string
}

export const routes : Route[] = [
    {
        id: 0,
        path: Routes.home,
        translateKey: 'pages:home'
    },
    {
        id: 0,
        path: Routes.programming,
        translateKey: 'pages:programming'
    },
    {
        id: 0,
        path: Routes.visuals,
        translateKey: 'pages:visuals'
    },
    {
        id: 0,
        path: Routes.music,
        translateKey: 'pages:music'
    },
]

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
            'programming:faceaface:text1',
            'programming:faceaface:text2',
            'programming:faceaface:text3',
            'programming:faceaface:text4'
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
            'programming:playbooth:text1',
            'programming:playbooth:text2',
            'programming:playbooth:text3'
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
            'programming:telekinesis:text1',
            'programming:telekinesis:text2',
            'programming:telekinesis:text3',
            'programming:telekinesis:text4'
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
            'programming:blink:text1',
            'programming:blink:text2',
            'programming:blink:text3',
            'programming:blink:text4',
            'programming:blink:text5',
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
        description: 'home:resume:concordia'
    },
    {
        image: '/Playmind_logo.png',
        link: 'http://playmind.com/',
        title: 'Gameplay & Systems\nProgrammer',
        years: '2018 - 2019',
        description: 'home:resume:playmind'
    },
    {
        image: '/Behaviour_logo.svg',
        link: 'https://www.bhvr.com/',
        title: 'Gameplay\nProgrammer',
        years: '2019 - 2020',
        description: 'home:resume:behaviour'
    },
    {
        image: '/Udem_logo.svg',
        link: 'https://www.umontreal.ca/',
        title: 'Major\nDigital Music',
        years: '2021 - 2024',
        description: 'home:resume:udem'
    }
]
