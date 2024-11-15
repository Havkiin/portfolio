import React, { ReactElement } from "react"
import { AlgorithmVisualizer } from "sorting-algorithm-visualizer/src/algorithmVisualizer"

export enum RouteEnums {
    default = '/',
    home = '/home',
    projects = '/projects'
}

export type RouteType = {
    id: number,
    path: RouteEnums,
    translateKey: string
}

export const routes : RouteType[] = [
    {
        id: 0,
        path: RouteEnums.home,
        translateKey: 'pages:home'
    },
    {
        id: 0,
        path: RouteEnums.projects,
        translateKey: 'pages:projects'
    }
]

export type CodeSnippetType = {
    text: string,
    codeblock: string
}

export type ExternalProjectPartType = {
    title: string,
    codeSnippets: CodeSnippetType[],
    image: string | null
}

export type ProgrammingProjectType = {
    id: number,
    name: string,
    languages: string[],
    banner: string,
    github: string
}

export type GameProgrammingProjectType = ProgrammingProjectType & {
    intro: string,
    projectParts: ExternalProjectPartType[]
}

export type WebProgrammingProjectType = ProgrammingProjectType & {
    source: ReactElement
}
  
export const programmingProjects : (GameProgrammingProjectType | WebProgrammingProjectType)[] = [
    {
        id: 0,
        name: 'Gameplay Abilities',
        languages: ['Unreal Engine', 'C++'],
        banner: '/Abilities-Preview.gif',
        github: 'https://github.com/Havkiin/FirstPersonAbilities',
        intro: 'projects:abilities:intro',
        projectParts: [
            {
                title: 'Telekinesis Component',
                codeSnippets: [
                    {
                        text: 'projects:abilities:text1',
                        codeblock: ''
                    }
                ],
                image: '/Abilities-Telekinesis.gif'
            },
            {
                title: 'Blink Component',
                codeSnippets: [
                    {
                        text: 'projects:abilities:text2',
                        codeblock: ''
                    }
                ],
                image: '/Abilities-Blink.gif'
            },
            {
                title: 'projects:abilities:title3',
                codeSnippets: [
                    {
                        text: 'projects:abilities:text3',
                        codeblock: ''
                    }
                ],
                image: '/Abilities-EndOfLevel.gif'
            },
            {
                title: 'projects:abilities:title4',
                codeSnippets: [
                    {
                        text: 'projects:abilities:text4',
                        codeblock: ''
                    }
                ],
                image: '/Abilities-LevelSelect.gif'
            }
        ]
    },
    {
        id: 1,
        name: 'Animated Fish',
        languages: ['Unity', 'C#', 'ShaderLab'],
        banner: '/Fish.gif',
        github: 'https://github.com/Havkiin/AnimatedCreatures',
        intro: 'projects:fish:intro',
        projectParts: [
            {
                title: 'Joints',
                codeSnippets: [
                    {
                        text: 'projects:fish:text1',
                        codeblock: 'public void UpdatePosition()\n{\n\tif (!anchor)\n\t\treturn;\n\n\tVector3 currentPosition = transform.position;\n\tVector3 anchorPosition = anchor.transform.position;\n\n\tVector3 direction = (currentPosition - anchorPosition).normalized;\n\ttransform.position = anchorPosition + direction * distanceToAnchor;\n}'
                    }
                ],
                image: null
            },
            {
                title: 'Spine Generator',
                codeSnippets: [
                    {
                        text: 'projects:fish:text2',
                        codeblock: 'float angle = Vector3.Angle(prevSegment, prevprevSegment);\n\nif (angle > movementComp.jointFlexibility)\n{\n\t// Define how much to rotate (small incremental correction)\n\tfloat angleDiff = angle - movementComp.jointFlexibility;\n\n\t// Rotation axis based on cross product\n\tVector3 axis = Vector3.Cross(prevprevSegment, prevSegment).normalized;\n\n\t// Apply small rotation to nudge joint back within the angle constraint\n\tQuaternion rotation = Quaternion.AngleAxis(-angleDiff, axis);\n\n\t// Rotate the vector and set the new position, ensuring the distance remains correct\n\tVector3 rotatedSegment = rotation * prevSegment;\n\tjoints[i].transform.position = anchorPosition - rotatedSegment.normalized * jointDistance;\n}'
                    }
                ],
                image: null
            },
            {
                title: 'Movement Component',
                codeSnippets: [
                    {
                        text: 'projects:fish:text3',
                        codeblock: 'Vector3 headPosition = head.transform.position;\n\ncurrentDirection = headPosition - head.follower.transform.position;\ncurrentDirection.Normalize();\n\nfloat wanderAngle = Random.Range(-turnAngle, turnAngle);\n\ncurrentDirection = (Quaternion.Euler(0, 0, wanderAngle) * currentDirection) + currentDirection;\ncurrentDirection.Normalize();\n\nVector3 newPosition = headPosition;\nnewPosition += currentDirection * movementSpeed * Time.deltaTime;\nhead.transform.position = newPosition;'
                    },
                    {
                        text: 'projects:fish:text4',
                        codeblock: 'wanderAngle += wiggleAmplitude * Mathf.Sin(Time.time * wiggleFrequency);'
                    },
                    {
                        text: 'projects:fish:text5',
                        codeblock: 'int layerMask = 1 << 6;\nVector3 leftSensor = Quaternion.Euler(0, 0, -sensorAngle) * currentDirection;\nVector3 rightSensor = Quaternion.Euler(0, 0, sensorAngle) * currentDirection;\n\nbool hitLeft = Physics.Raycast(headPosition, leftSensor, 1.5f, layerMask);\nbool hitRight = Physics.Raycast(headPosition, rightSensor, 1.5f, layerMask);\n\nif (hitLeft)\n{\n\twanderAngle += 45.0f;\n}\nelse if (hitRight)\n{\n\twanderAngle = -45.0f;\n}'
                    }
                ],
                image: null
            },
            {
                title: 'Shader',
                codeSnippets: [
                    {
                        text: 'projects:fish:text6',
                        codeblock: 'for (int j = 0; j < 25; j++)\n{\n\tfloat3 p0 = _OutlinePoints[max(j-1, 0)].xyz;\n\tfloat3 p1 = _OutlinePoints[j].xyz;\n\tfloat3 p2 = _OutlinePoints[min(j+1, 24)].xyz;\n\tfloat3 p3 = _OutlinePoints[min(j+2, 24)].xyz;\n\n\t// Interpolate along the curve\n\tfor (float t = 0.0; t <= 1.0; t += 0.1)\n\t{\n\t\tfloat3 curvePoint = catmullRom(p0, p1, p2, p3, t);\n\t\tfloat dist = distance(i.uv, curvePoint.xy);\n\t\tminDist = min(minDist, dist);\n\t}\n}'
                    },
                    {
                        text: 'projects:fish:text7',
                        codeblock: 'bool pointInPolygon(float2 p, float4 outlinePoints[25], int numPoints)\n{\n\tbool inside = false;\n\tfor (int i = 0, j = numPoints - 1; i < numPoints; j = i++) \n\t{\n\t\tfloat2 pi = outlinePoints[i].xy;\n\t\tfloat2 pj = outlinePoints[j].xy;\n\n\t\t// Check if the point is inside using the ray-casting method\n\t\tif (((pi.y > p.y) != (pj.y > p.y)) &&\n\t\t\t(p.x < (pj.x - pi.x) * (p.y - pi.y) / (pj.y - pi.y) + pi.x))\n\t\t{\n\t\t\tinside = !inside;\n\t\t}\n\t}\n\treturn inside;\n}'
                    },
                    {
                        text: 'projects:fish:text8',
                        codeblock: '// Draw outline, spine, eyes\nif (minDist < (_OutlineWidth * 0.01) || isSpinePoint || isEye)\n{\n\treturn _OutlineColor;\n}\n// Draw color\nelse if (pointInPolygon(i.uv, _OutlinePoints, 25))\n{\n\treturn _Color;\n}\nelse if (isFin)\n{\n\treturn _FinColor;\n}\n\n// Otherwise, make the fragment transparent\nreturn fixed4(0, 0, 0, 0);'
                    }
                ],
                image: null
            }
        ]
    },
    {
        id: 2,
        name: 'Algorithm Visualizer',
        languages: ['React', 'TypeScript'],
        banner: '/AlgorithmVisualizer.png',
        github: 'https://github.com/Havkiin/algorithm-visualizer',
        source: <AlgorithmVisualizer />,
    }
]

export type VisualProject = {
    id: number,
    name: string,
    source: string,
    description: string
}

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
        title: 'home:resume:concordia:title',
        years: '2014 - 2018',
        description: 'home:resume:concordia:description'
    },
    {
        image: '/Playmind_logo.png',
        link: 'http://playmind.com/',
        title: 'home:resume:playmind:title',
        years: '2018 - 2019',
        description: 'home:resume:playmind:description'
    },
    {
        image: '/Behaviour_logo.svg',
        link: 'https://www.bhvr.com/',
        title: 'home:resume:behaviour:title',
        years: '2019 - 2020',
        description: 'home:resume:behaviour:description'
    },
    {
        image: '/Udem_logo.svg',
        link: 'https://www.umontreal.ca/',
        title: 'home:resume:udem:title',
        years: '2021 - 2024',
        description: 'home:resume:udem:description'
    }
]
