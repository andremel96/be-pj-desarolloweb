var prisma = require('../model/prismaModel')

exports.getbotAll = async (req, res) => {
    let bot = await prisma.bot.findMany(
        {
            select: {
                id_bot: true,
                estado_bot: true,
                user_bot: {
                    select: {
                        user_botId: true,
                        id_UserName: true,
                    }
                }
            }
        });

    res.json({ bot: bot })
}


exports.createbot = async (req, res) => {
    var{estado_bot, user_botId} = req.body;
    await prisma.bot.create({
        data:{
            estado_bot,
            user_bot: { connect: { id_UserName: user_botId }}
        }
    }).then((result) => {
        res.json(result)
    }).catch(error => {
        res.json({ ex: error, description: error.code ===  "Ha ocurrido un error desconcido" })
    })
}

exports.updatebot= async (req, res) => {
    let id = req.params.id
    var { estado_bot, user_botId} = req.body;
    let updatebot = await prisma.bot.update({
        where: { id_bot: Number(id) || undefined },
        data: {
            estado_bot, 
            user_bot: { connect: { id_UserName: user_botId }}
        },
    })
    res.json(updatebot)
}