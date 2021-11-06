var prisma = require('../model/prismaModel')
var passwordEncrypt = require('../model/passwordEncrypt')
var jwt = require('../utils/jwt');

//------------------------------USUARIO
exports.getAllUsers = async (req, res) => {
    let user = await prisma.users.findMany(
        {
            select: {
                id_UserName: true,
                iduserNumero: true,
                user_name: true,
                password: false,
                name: true,
                last_name: true,
                user_type: {
                    select: {
                        idTypes_User: true,
                        name_typesUser: true,
                    }
                }
            }
        });

    res.json({ user: user })
}

exports.login = async (req, res) => {
    let { user_name, password } = req.body;
    console.log(user_name, password);
    let user = await prisma.users.findUnique({
        where: {
            user_name
        }
    });

    if (!user) {
        res.status(200).json({ status: 'error', message: 'Usuario no registrado' })
    } else {
        const checkPassword = passwordEncrypt.comparePassword(password, user.password)
        if (!checkPassword) {
            res.status(200).json({ status: 'error', message: "Usuario o contraseña incorrecta" })
        } else {
            delete user.password
            const accessToken = await jwt.signAccessToken(user)
            res.json({ ...user, status: 'success', accessToken })
        }
    }
}

exports.getUser = async (req, res) => {
    let id = req.params.id
    let oneUser = await prisma.users.findUnique(
        {
            where: {
                id_UserName: Number(id)
            }
        }
    )
    res.json(oneUser)
}

exports.updateUser = async (req, res) => {
    let id = req.params.id
    var { iduserNumero, user_name, name, last_name } = req.body;
    let oneUser = await prisma.users.findUnique(
        {
            where: {
                id_UserName: Number(id)
            }
        }
    )
    let updatedUser = await prisma.users.update({
        where: { id_UserName: Number(id) || undefined },
        data: { iduserNumero, user_name, name, password: oneUser.password, last_name },
    })
    delete updatedUser.password
    res.json(updatedUser)
}

exports.createUser = async (req, res) => {
    try {
        var { iduserNumero, user_name, password, name, last_name } = req.body;
        await prisma.users.create({
            data: {
                iduserNumero,
                user_name,
                password: passwordEncrypt.cryptPassword(password),
                name,
                last_name,
                user_typeid: 2,
                // carrera_conect: { connect: { carrera: usercarrera } },
                // curso_conect: { connect: { curso: usercurso } },
            }
        }).then((result) => {
            res.json(result)
        }).catch(error => {
            res.json({ ex: error, description: error.code === 'P2002' ? "El carnet ya existe" : "Ha ocurrido un error desconcido" })
        })
    } catch (error) {
        res.json({ ex: error, description: error.code === 'P2002' ? "El carnet ya existe" : "Ha ocurrido un error desconcido" })
    }
}

exports.deleteUser = async (req, res) => {
    const { id } = req.params
    const deleteUserResult = await prisma.user.delete({
        where: {
            id_UserName: Number(id)
        }
    }
    )
    res.json(deleteUserResult)
}




//------------------------------------------TIPOS DE USUARIO 

exports.getAllTypeUser = async (req, res) => {
    let = id = req.params.id
    let Type_User = await prisma.Type_User.findMany();
    res.json({ Type_User: Type_User })
}

exports.getTypeUser = async (req, res) => {
    let = id = await prisma.Type_User.findUnique(
        {
            where: {
                idTypes_User: Number(id)
            }
        }
    )
    res.json(Type_User)
}

exports.updateTypeUser = async (req, res) => {
    let id = req.params.id
    var { name_typesUser } = req.body;
    let updatedTypeUser = await prisma.Type_User.update({
        where: { idTypes_User: Number(id) || undefined },
        data: { name_typesUser },
    })
    res.json(updatedTypeUser)
}

exports.createTypeUser = async (req, res) => {
    var { name_typesUser } = req.body;
    await prisma.Type_User.create({
        data: {
            name_typesUser
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === 'P2002' ? "Este tipo de usuario ya existe" : "Ha ocurrido un error desconcido" })
    })
}

exports.deleteTypeUser = async (req, res) => {
    const { id } = req.params
    const deleteTypeUser = await prisma.post.delete({
        where: {
            idTypes_User: Number(id)
        }
    }
    )
    res.json(deleteTypeUser)
}





//---------------------------------------------USER NOTA

exports.getAllUser_nota = async (req, res) => {
    let = id = req.params.id
    let user_nota = await prisma.user_nota.findMany();
    res.json({ user_nota: user_nota })
}

exports.getUser_nota = async (req, res) => {
    let = id = await prisma.user_nota.findUnique(
        {
            where: {
                iduser_notas: Number(id)
            }
        }
    )
    res.json(user_nota)
}

exports.updateUser_nota = async (req, res) => {
    let id = req.params.id
    var { nota, description_notas, user_nota, curso_nota, carrera_nota } = req.body;
    let updateUser_nota = await prisma.user_nota.update({
        where: { iduser_notas: Number(id) || undefined },
        data: { nota, description_notas, user_nota, curso_nota, carrera_nota },
    })
    res.json(updateUser_nota)
}

exports.createUser_nota = async (req, res) => {
    var { nota, description_notas } = req.body;
    await prisma.user_nota.create({
        data: {
            nota,
            description_notas,
            user_nota,
            curso_nota,
            carrera_nota
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === "Ha ocurrido un error desconcido" })
    })
}

exports.deleteUser_nota = async (req, res) => {
    const { id } = req.params
    const deleteUser_nota = await prisma.post.delete({
        where: {
            iduser_notas: Number(id)
        }
    }
    )
    res.json(deleteUser_nota)
}