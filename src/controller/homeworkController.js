var prisma = require('../model/prismaModel')

//----------------------------TAREAS
exports.getAllHomework = async (req, res) => {
    let homeworks = await prisma.homework.findMany(
        {
            select: {
                id_homework: true,
                name_homework: true,
                description_homework: true,
                nota_homework: true,
                due_date: true,
                cursoconect_curso: {
                    select: {
                        idcurso: true,
                        name_curso: true,
                    }
                },
                conect_status: {
                    select: {
                        id_status: true,
                        name_status: true,
                    }
                }
            }
        });
    res.json({ homeworks: homeworks })
}


exports.getHomework = async (req, res) => {
    let id = req.params.id
    let oneHomework = await prisma.homework.findUnique(
        {
            where: {
                id_homework: Number(id)
            }
        }
    )
    res.json(oneHomework)
}

exports.updateHomework = async (req, res) => {
    let id = req.params.id
    var { name_homework, description_homework, nota_homework, delivary_date, due_date } = req.body;
    let updateHomework = await prisma.homework.update({
        where: { id_homework: Number(id) || undefined },
        data: { name_homework, description_homework, nota_homework, delivary_date, due_date },
    })
    res.json(updateHomework)
}

exports.createHomework = async (req, res) => {
    var { name_homework, description_homework, nota_homework } = req.body;
    await prisma.homework.create({
        data: {
            name_homework,
            description_homework,
            nota_homework,
            delivary_date,
            due_date,
            cursoconect_cursoid: 1,
            conect_statusid: 1
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === 'P2002' ? "La tarea ya existe" : "Ha ocurrido un error desconcido" })
    })
}

exports.deleteHomework = async (req, res) => {
    const { id } = req.params
    const deleteHomework = await prisma.post.delete({
        where: {
            id_UserName: Number(id)
        }
    }
    )
    res.json(deleteHomework)
}

//---------------------------------ESTATUS TAREAS
exports.getAllHomeworkStatus = async (req, res) => {
    let status_homework = await prisma.status_homework.findMany();
    res.json({ status_homework: status_homework })
}


exports.getHomeworkStatus = async (req, res) => {
    let id = req.params.id
    let onestatus_homework = await prisma.status_homework.findUnique(
        {
            where: {
                id_status: Number(id)
            }
        }
    )
    res.json(onestatus_homework)
}

exports.updateHomeworkStatus = async (req, res) => {
    let id = req.params.id
    var { name_status } = req.body;
    let updateHomeworkStatus = await prisma.status_homework.update({
        where: { id_status: Number(id) || undefined },
        data: { name_status },
    })
    res.json(updateHomeworkStatus)
}

exports.createHomeworkStatus = async (req, res) => {
    var { name_status } = req.body;
    await prisma.status_homework.create({
        data: {
            name_status
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === 'P2002' ? "La tarea ya existe" : "Ha ocurrido un error desconcido" })
    })
}

exports.deleteHomeworkStatus = async (req, res) => {
    const { id } = req.params
    const deletestatus_homework = await prisma.post.delete({
        where: {
            id_status: Number(id)
        }
    }
    )
    res.json(deletestatus_homework)
}


// ----------------------------------------------------------------tareas por medio del username

exports.gethomeworkuser = async (req, res) => {
    const { username } = req.params
    let homeworks = await prisma.users.findMany(
        {
            select: {
                id_UserName: false,
                iduserNumero: true,
                user_name: true,
                password: false,
                name: true,
                last_name: true,
                user_type: false,
                user_typeid: false,
                carrera_conect: {
                    select: {
                        idcarrera_conect: false,
                        user_carrera: false,
                        user_carreraId: false,
                        carreraconect_carrera: {
                            select: {
                                idCarrera: false,
                                idcarreraNumero: true,
                                name_carrera: true
                            }
                        },
                        carreraconect_carreraid: false
                    }
                },
                curso_conect: {
                    select: {
                        user_cursoId: true,
                        cursoconect_curso: {
                            select: {
                                name_curso:true,
                                homework: {
                                    select: {
                                        id_homework: true,
                                        name_homework: true,
                                        description_homework: true,
                                        nota_homework: true,
                                        due_date: true,
                                        conect_status: {
                                            select: {
                                                id_status: true,
                                                name_status: true,
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    },
                    where: {
                        cursoconect_cursoid: {
                            not: null
                        }
                    }
                },
                user_nota: false
            },
            where: {
                user_name: username
            }
        });
    res.json({ homeworks: homeworks })
}