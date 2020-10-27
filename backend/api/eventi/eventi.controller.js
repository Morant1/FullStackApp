const eventiService = require('./eventi.service')
const logger = require('../../services/logger.service')



// GET SINGLE
async function getEventi(req, res) {
    const eventi = await eventiService.getById(req.params.id)
    res.send(eventi)
}

 //GET LIST

async function getEventis(req, res) {
    const filterBy = req.query;
    const eventis = await eventiService.query(filterBy)
    // logger.debug(eventis);
    res.send(eventis)
}


// REMOVE
async function deleteEventi(req, res) {
    await eventService.remove(req.params.id)
    res.end()
}

//UPDATE EVENT
async function updateEventi(req, res) {
    const eventi = {...req.body};
    await eventService.update(eventi)
    res.send(eventi)
}



//ADD
async function addEventi(req, res) {
    const eventi = req.body;
    // eventi.createdAt = Date.now();
    await eventService.add(eventi)
    res.send(eventi)
}

module.exports = {
    getEventi,
    getEventis,
    deleteEventi,
    updateEventi,
    addEventi
}