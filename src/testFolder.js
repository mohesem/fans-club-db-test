import fs from 'fs'

fs.readdir(`${__dirname}/logo`, (err, files) => { 
    console.log(err, files)
})
