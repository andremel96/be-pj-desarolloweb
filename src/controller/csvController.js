const csv = require('csv-parser');
const streamifier = require('streamifier');
var prisma = require('../model/prismaModel')
var passwordEncrypt = require('../model/passwordEncrypt')

exports.upload = async (req, res) => {
    var b = req.file["buffer"]
    console.log(req.file)
    console.log(b.toString())
    let results = []
    streamifier.createReadStream(req.file.buffer)
    .pipe(csv({separator: ';'}))
        .on('data', (row) => {
            delete row['']
            results.push(row)
            prisma.users.create({
                data: {
                    iduserNumero:row['Id de Estudiante'],
                    user_name:row['Nombre de Usuario'],
                    password: passwordEncrypt.cryptPassword(row.Password),
                    name:row.Nombre,
                    last_name:row.Apellido,
                    user_typeid: Number(row['Tipo de Usuario'])
                }
            }).then((result) => {
                console.log("Row insertada: "+JSON.stringify(row))
            }).catch(error => {
               console.log(error)
            })
        })
        .on('end', () => {
            res.send(results)

            console.log('CSV file successfully processed');
        });
};