var prisma = require('../model/prismaModel')
// CURSO
exports.getAllCursos= async (req, res) => {
    let curso = await prisma.curso.findMany();
    res.json({ curso: curso })
}

exports.getCurso = async (req, res) => {
    let= id = req.params.id
    let curso = await prisma.curso.findUnique(
        {
            where:{
                idcurso: Number(id)
            }
        }
    )
    res.json(curso)
}

exports.updateCurso= async (req, res) => {
    let id = req.params.id
    var { idcursoNumero, name_curso} = req.body;
    let updateCurso = await prisma.curso.update({
        where: { idcurso: Number(id) || undefined },
        data: {idcursoNumero, name_curso},
    })
    res.json(updateCurso)
}

exports.createCurso = async (req, res) => {
    var{idcursoNumero, name_curso} = req.body;
    await prisma.curso.create({
        data:{
            idcursoNumero,
            name_curso
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === 'P2002' ? "El Curso ya existe" : "Ha ocurrido un error desconcido" })
    })
}

exports.deleteCurso = async (req, res) => {
    let { id } = req.params
    let deleteCurso = await prisma.curso.delete({
        where: {
            idcurso: Number(id)
        }
    }
    )
    res.json(deleteCurso)
}

// CURSO CONECT

exports.getAllCursoConect = async (req, res) => {
    let= id = req.params.id
    let curso_conect = await prisma.curso_conect.findMany();
    res.json({ curso_conect: curso_conect })
}

exports.getCursoConect = async (req, res) => {
    let= id = await prisma.curso_conect.findUnique(
        {
            where: {
                idcurso_conect: Number(id)
            }
        }
    )
    res.json(curso_conect)
}

exports.createCursoConect = async (req, res) => {
    var{cursoconect_cursoid, user_cursoId} = req.body;
    await prisma.curso_conect.create({
        data:{
            cursoconect_curso: { connect: { idcurso: cursoconect_cursoid }} ,
            user_curso: { connect: { id_UserName: user_cursoId }}
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === "Ha ocurrido un error desconcido" })
    })
}

exports.deleteCursoConect = async (req, res) => {
    const { id } = req.params
    const deleteCursoConect = await prisma.post.delete({
        where: {
            idcurso_conect: Number(id)
        }
    }
    )
    res.json(deleteCursoConect)
}
