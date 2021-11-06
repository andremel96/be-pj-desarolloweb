var prisma = require('../model/prismaModel')

exports.getbotAll = async (req, res) => {
    let bot = await prisma.bot.findMany(
        {
            select: {
                id_bot: true,
                estado_bot: true,
                user_bot: {
                    select: {
                        id_UserName: true,
                    }
                }
            }
        });

    res.json({ bot: bot })
}

exports.getBot = async (req, res) => {
    let id = req.params.id
    let bot = await prisma.bot.findFirst(
        {
            select: {
                id_bot: true,
                estado_bot: true,
                chatId:true,
                user_bot: {
                    select: {
                        id_UserName: true,
                        user_name:true
                    }
                }
            },
            where:{
                chatId:Number(id)
            }
        });

    res.json({ bot: bot })
}


exports.createbot = async (req, res) => {
    var{estado_bot, user_botId,chatId} = req.body;
    await prisma.bot.create({
        data:{
            estado_bot,
            chatId,
            user_botId
        }
    }).then((result) => {
        res.json({status:'success',result})
    }).catch(error => {
        console.log(error);
        res.json({ status:'error',ex: error, description: error.code ===  "Ha ocurrido un error desconcido" })
    })
}

exports.updatebot= async (req, res) => {
    let id = req.params.id
    var { estado_bot} = req.body;
    let updatebot = await prisma.bot.update({
        where: { chatId: Number(id) || undefined },
        data: {
            estado_bot
        },
    })
    res.json(updatebot)
}