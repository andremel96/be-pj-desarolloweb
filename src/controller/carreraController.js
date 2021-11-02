
var prisma = require('../model/prismaModel')

//-------------------------------------------------CARRERA
exports.getAllCarrera = async (req, res) => {
    let carrera= await prisma.carrera.findMany();
    res.json ({ carrera: carrera })
}

exports.getCarrera = async (req, res) => {
    let= id = await prisma.carrera.findUnique(
        {
            where: {
                idCarrera: Number(id)
            }
        }
    )
    res.json(carrera)
}

exports.updateCarrera= async (req, res) => {
    let id = req.params.id
    var { idcarreraNumero, name_carrera} = req.body;
    let updateCarrera = await prisma.carrera.update({
        where: { idCarrera: Number(id) || undefined },
        data: {idcarreraNumero, name_carrera},
    })
    res.json(updateCarrera)
}

exports.createCarrera = async (req, res) => {
    var{idcarreraNumero, name_carrera} = req.body;
    await prisma.carrera.create({
        data:{
            idcarreraNumero,
            name_carrera
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code === 'P2002' ? "La carrera ya existe" : "Ha ocurrido un error desconcido" })
    })
}

exports.deleteCarrera = async (req, res) => {
    const { id } = req.params
    const deleteCarrera = await prisma.post.delete({
        where: {
            idCarrera: Number(id)
        }
    }
    )
    res.json(deleteCarrera)
}

//------------------------------------CONECT CARRERA 

exports.getAllCarreraConect = async (req, res) => {
    let= id = req.params.id
    let carrera_conect = await prisma.carrera_conect.findMany();
    res.json({ carrera_conect: carrera_conect })
}

exports.getCarreraConect = async (req, res) => {
    let= id = await prisma.carrera_conect.findUnique(
        {
            where: {
                idcarrera_conect: Number(id)
            }
        }
    )
    res.json(carrera_conect)
}

exports.createCarreraConect = async (req, res) => {
    await prisma.carrera_conect.create({
        data:{
            carreraconect_carrera,
            user_carrera
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code ===  "Ha ocurrido un error desconcido" })
    })
}

exports.deleteCarreraConect = async (req, res) => {
    const { id } = req.params
    const deleteCarreraConect = await prisma.post.delete({
        where: {
            idcarrera_conect: Number(id)
        }
    }
    )
    res.json(deleteCarreraConect)
}
