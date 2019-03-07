let schedule = require('node-schedule')
let mongoose = require('mongoose')

function resetSigned () {
  schedule.scheduleJob('00 0 0 * * *', async () => {
    let Signed = mongoose.model('Signed')
    await Signed.update(null, { todayIsSigned: false }, { multi: true }).then(res => {
      console.log('--------------')
      console.log(res)
      console.log('--------------')
    })
  })
}

module.exports = {
  resetSigned
}