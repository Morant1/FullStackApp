
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const moment = require('moment');



module.exports = {
    query,
    getById,
    remove,
    update,
    add
}



async function query(filterBy) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('eventi')
    try {
        const eventis = await collection.find(criteria).toArray();
        const filteredEventis =  _filteredEventis(eventis, filterBy.date)
        return _sortedEventis(filteredEventis,filterBy.sort)

    } catch (err) {
        console.log('ERROR: cannot find events')
        throw err;
    }
}

function _sortedEventis(eventis,sort) {
    if (!sort) return eventis;
    let sortedEvents;

    if (sort === 'date') {
    sortedEvents = eventis.sort((a, b) => {
            return a.startsAt < b.startsAt ? -1 : a.startsAt > b.startsAt ? 1 : 0
        })
    }
    if (sort === 'participants') {
        sortedEvents = eventis.sort((a, b) => {
            return a[sort].length > b[sort].length  ? -1 : a[sort].length  < b[sort].length ? 1 : 0
        })
    }

    return sortedEvents;
    
}

function _filteredEventis(eventis, date) {
    let filteredEventis;
    if (date === 'all' || !date) filteredEventis = eventis;
    const todayStr = moment(Date.now()).format('L')


    if (date === 'today') {
        filteredEventis = eventis.filter(eventi => {
            return moment(eventi.startsAt).format('L') === todayStr;})
    }
    if (date === 'week' || date === 'month' || date === 'year' ) {
        filteredEventis = eventis.filter(eventi => {
            return moment(eventi.startsAt).isSame(Date.now(),date);
        })
    }
    return filteredEventis;
}







async function getById(eventId) {
    const collection = await dbService.getCollection('eventi')
    try {
        const eventi = await collection.findOne({ "_id": ObjectId(eventId) })
        return eventi

    } catch (err) {
        console.log(`ERROR: while finding eventi ${eventId}`)
        throw err;
    }
}


async function remove(eventiId) {
    console.log(eventiId)
    const collection = await dbService.getCollection('eventi')
    try {
        await collection.deleteOne({ "_id": ObjectId(eventiId) })
    } catch (err) {
        console.log(`ERROR: cannot remove eventi ${eventiId}`)
        throw err;
    }
}




async function update(eventi) {
    const collection = await dbService.getCollection('eventi')
    eventi._id = ObjectId(eventi._id);

    try {
        await collection.replaceOne({ "_id": eventi._id }, eventi)
        console.log("eventi update server",eventi)
        return eventi
    } catch (err) {
        console.log(`ERROR: cannot update eventi ${eventi._id}`)
        throw err;
    }
}



async function add(eventi) {
    const collection = await dbService.getCollection('eventi')
    try {
        const newEventi = await collection.insertOne(eventi);
        return newEventi;
    } catch (err) {
        console.log(`ERROR: cannot insert eventi`)
        throw err;
    }
}



function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.title) {
        criteria.title = new RegExp(filterBy.title, 'ig');
    }

 
    return criteria;
}






