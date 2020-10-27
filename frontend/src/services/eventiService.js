
import httpService from './httpService';

export const eventiService = {
    query,
    getById

}

function query(filterBy) {
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


  

  