import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany
}

function query(entityType, delay = 200) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    if (!entities.length) entities = [...dataBoards]
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    console.log('from storge', entityId)
    return query(entityType)
        .then(entities => {
            return entities.find(entity => entity._id === entityId)
        })
}
function post(entityType, newEntity) {
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.push(newEntity)
            _save(entityType, entities)
            return newEntity
        })
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function postMany(entityType, newEntities) {
    return query(entityType)
        .then(entities => {
            newEntities = newEntities.map(entity => ({ ...entity, _id: _makeId() }))
            entities.push(...newEntities)
            _save(entityType, entities)
            return entities
        })
}

const dataBoards = [
    {
        "_id": utilService.makeId(),
        "title": "Robot dev proj",
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": {
            "_id": utilService.makeId(),
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "#26de81"
        },
        "labels": [
            {
                "id": "l101",
                "title": "None",
                "color": "#7BC86C"
            },
            {
                "id": "l102",
                "title": "None",
                "color": "##F5DD29"
            },
            {
                "id": "l103",
                "title": "None",
                "color": "#FFAF3F"
            },
            {
                "id": "l104",
                "title": "None",
                "color": "#CD8DE5"
            },
            {
                "id": "l105",
                "title": "None",
                "color": "#5BA4CF"
            }
        ],
        "groups": [
            {
                "id": "g101",
                "title": "Group 1",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c101",
                        "title": "Replace logo",
                        "style": {
                            "bg": {
                                "color": " #26de81",
                                "imgUrl": null,
                                "fullCover": true
                            }
                        }
                    },
                    {
                        "id": "c102",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
            {
                "id": "g102",
                "title": "Group 2",
                "tasks": [
                    {
                        "id": "c103",
                        "title": "Do that",
                        "description": "sprint 4",
                        "createdAt": 1590999730348,
                        "archivedAt": 1589983468418
                    },
                    {
                        "id": "c104",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg",
                                "fullCover": true
                            }
                        }
                    }
                ],
                "style": {}
            }
        ]
    },
    {
        "_id": utilService.makeId(),
        "title": "Sprint 4",
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": {
            "_id": utilService.makeId(),
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": "#223ccec5"
        },
        "labels": [
            {
                "id": "l101",
                "title": "None",
                "color": "#7BC86C"
            },
            {
                "id": "l102",
                "title": "None",
                "color": "##F5DD29"
            },
            {
                "id": "l103",
                "title": "None",
                "color": "#FFAF3F"
            },
            {
                "id": "l104",
                "title": "None",
                "color": "#CD8DE5"
            },
            {
                "id": "l105",
                "title": "None",
                "color": "#5BA4CF"
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": null
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": null
            }
        ],
        "groups": [
            {
                "id": "g111",
                "title": "Frontend",
                "archivedAt": 1589983468418,
                "tasks": [
                    {
                        "id": "c111",
                        "title": "Replace logo",
                        "memberIds": ["u102"],
                        "labelIds": ["l105"],
                    },
                    {
                        "id": "c112",
                        "title": "Add Samples"
                    }
                ],
                "style": {}
            },
            {
                "id": "g112",
                "title": "Backend",
                "tasks": [
                    {
                        "id": "c113",
                        "title": "Do that",
                        "description": "sprint 4",
                        "createdAt": 1590999730348,
                        "archivedAt": 1589983468418,
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg",
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c114",
                        "title": "Help me",
                        "status": "in-progress",
                        "description": "description",
                        "createdAt": 1590999730348,
                        "dueDate": 16156215211,
                        "byMember": {
                            "_id": "u101",
                            "username": "Tal",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                        },
                        "style": {
                            "bg": {
                                "color": "#00de81",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    }
                ],
                "style": {}
            }
        ]
    },
    {
        "_id": utilService.makeId(),
        "title": "Sprint 4 - demo data",
        "archivedAt": null,
        "createdAt": Date.now(),
        "createdBy": {
            "_id": utilService.makeId(),
            "fullname": "Abi Abambi",
            "imgUrl": "http://some-img"
        },
        "style": {
            "bgColor": null,
            "imgUrl": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2400x1600/bde90942b25945192718669aca01489b/photo-1662901603057-057ff15eb6eb.jpg"
        },
        "labels": [
            {
                "id": "l101",
                "title": "None",
                "color": "#7BC86C" // Green
            },
            {
                "id": "l102",
                "title": "None",
                "color": "#F5DD29" //Yellow
            },
            {
                "id": "l103",
                "title": "None",
                "color": "#FFAF3F" // Orange
            },
            {
                "id": "l104",
                "title": "None",
                "color": "#EF7564"//Red
            },
            {
                "id": "l105",
                "title": "None",
                "color": "#CD8DE5"//Purple
            },
            {
                "id": "l106",
                "title": "None",
                "color": "#5BA4CF" //Blue
            }
        ],
        "members": [
            {
                "_id": "u101",
                "fullname": "Maor Layani",
                "imgUrl": "https://ca.slack-edge.com/T03E3RZ2KHV-U03GZSLVC3Z-0637bd0f161c-512"
            },
            {
                "_id": "u102",
                "fullname": "Nir Shvrchberg",
                "imgUrl": null
            },
            {
                "_id": "u103",
                "fullname": "Risan Benichou",
                "imgUrl": null
            }
        ],
        "groups": [
            {
                "id": "g201",
                "title": "Backlog-Server",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c201",
                        "title": "Create backend services"
                    },
                    {
                        "id": "c202",
                        "title": "Routing Directory",
                        "memberIds": ["u102"],
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348742/background-img-mountains_kqtnuv.jpg",
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c203",
                        "title": "Socket implementation",
                        "labelIds": ["l105"],
                        "style": {
                            "bg": {
                                "color": "#ef7564",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c204",
                        "title": "Data Modal Approval",
                        "dueDate": 16156215211
                    },
                    {
                        "id": "c205",
                        "title": "Create a server with express",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348746/background-img-fog_qkibl9.jpg",
                                "fullCover": false
                            }
                        },

                    }
                ],
                "style": {}
            },
            {
                "id": "g301",
                "title": "Backlog-Client",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c302",
                        "title": "Add TaskDetails",
                        "labelIds": ["l101", "l103"]
                    },
                    {
                        "id": "c303",
                        "title": "Adding npm libraries",
                        "labelIds": ["l101", "l103", "l104", "l106"],
                        "memberIds": ["u101", "u103"]
                    },
                    {
                        "id": "c301",
                        "title": "Planning the components tree",
                        "labelIds": ["l101", "l103", "l104"],
                        "memberIds": ["u101", "u102", "u103"],
                        "dueDate": 16156215211,
                        "style": {
                            "bg": {
                                "color": "#7bc86c",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c304",
                        "title": "Build basic template",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY2MzM0ODI4OQ&ixlib=rb-1.2.1&q=80&w=200",
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c305",
                        "title": "Implement Sass"
                    }
                ],
                "style": {}
            },
            {
                "id": "g401",
                "title": "In development",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c401",
                        "title": "Functional testing for app header",
                        "labelIds": ["l103", "l104"],
                        "dueDate": 16156215211,
                        "style": {
                            "bg": {
                                "color": "#ffaf3f",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c402",
                        "title": "Build basic template",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x365/0eba7de903143c66f2ac55cdb0b7de58/photo-1662943523548-373718f22124.jpg",
                                "fullCover": false
                            }
                        }
                    }
                ],
                "style": {}
            },
            {
                "id": "g501",
                "title": "Done",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c501",
                        "title": "CSS variables",
                        "labelIds": ["l101", "l103", "l106"],
                        "memberIds": ["u103"],
                        "style": {
                            "bg": {
                                "color": "#29cce5",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c502",
                        "title": "Making functions and mixins",
                        "memberIds": ["u102"]
                    },
                    {
                        "id": "c503",
                        "title": "CSS directory",
                        "dueDate": 16156215211
                    },
                    {
                        "id": "c504",
                        "title": "https://www.npmjs.com/package/@material-ui/core",
                        // "style": {
                        //     "bg": {
                        //         "color": null,
                        //         "imgUrl": "https://www.npmjs.com/package/@material-ui/core",
                        //         "fullCover": false
                        //     }
                        // }
                    }
                ],
                "style": {}
            },
            {
                "id": "g601",
                "title": "QA",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c601",
                        "title": "Meeting with head manager for planning the code progress",
                        "labelIds": ["l103", "l104"]
                    },
                    {
                        "id": "c602",
                        "title": "End day code review with all members",
                        "labelIds": ["l103", "l104"],
                        "style": {
                            "bg": {
                                "color": "#29cce5",
                                "imgUrl": null,
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c603",
                        "title": "Checking bugs",
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg",
                                "fullCover": true
                            }
                        }
                    },
                    {
                        "id": "c604",
                        "title": "Active from head manager",
                        "labelIds": ["l102", "l104"]
                    },
                    {
                        "id": "c605",
                        "title": "Inspector"
                    },
                    {
                        "id": "c606",
                        "title": "Assets"
                    }
                ],
                "style": {}
            },
            {
                "id": "g701",
                "title": "Ready for production",
                "archivedAt": null,
                "tasks": [
                    {
                        "id": "c701",
                        "title": "Creating database with mongo",
                        "labelIds": ["l104", "l106"],
                        "memberIds": ["u101", "u102", "u103"],
                        "style": {
                            "bg": {
                                "color": null,
                                "imgUrl": "https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg",
                                "fullCover": false
                            }
                        }
                    },
                    {
                        "id": "c702",
                        "title": "App header",
                        "labelIds": ["l102"],
                        "memberIds": ["u101", "u103"],
                        "dueDate": 16156215211
                    }
                ],
                "style": {}
            }
        ]
    }
]

const imgArr =
    [
        'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348742/background-img-mountains_kqtnuv.jpg',
        'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663348746/background-img-fog_qkibl9.jpg',
        'https://images.unsplash.com/photo-1663076121570-eb6e69bdde3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDEwfDMxNzA5OXx8fHx8Mnx8MTY2MzM0ODI4OQ&ixlib=rb-1.2.1&q=80&w=200',
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x365/0eba7de903143c66f2ac55cdb0b7de58/photo-1662943523548-373718f22124.jpg',
        'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229161/bug_bkvxx9.jpg',
        'https://res.cloudinary.com/dqhrqqqul/image/upload/v1663229153/code_mvpcmf.jpg'
    ]