
import httpService from './httpService';

export const eventiService = {
    query,
    getById,
    getPrevNext

}

function query(filterBy={}) {
    let queryStr ='?';

    for (const key in filterBy) {
        queryStr += `${key}=${filterBy[key]}&`;

    }
    return httpService.get(`eventi${queryStr || ''}`);
  }

async function getById(eventId) {
    const eventi = await httpService.get(`eventi/${eventId}`);
    return eventi;

}

async function getPrevNext(currEventi){
    const eventis = await query();

    const eventisByTag = eventis.filter(eventi => eventi.tags[0] === currEventi.tags[0])
    const currIdx = eventisByTag.findIndex(eventi => eventi._id === currEventi._id)
    const nextEventi = eventisByTag[currIdx + 1] || eventisByTag[0]
    const prevEventi = eventisByTag[currIdx - 1] || eventisByTag[eventisByTag.length - 1]
 
     return {
       prevId: prevEventi._id,
       nextId: nextEventi._id
     }
}


  

  