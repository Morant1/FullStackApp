
import httpService from './httpService';

export const eventiService = {
    query

}

function query(filterBy) {
    let queryStr ='?';

    for (const key in filterBy) {
        queryStr += `${key}=${filterBy[key]}&`;

    }
    return httpService.get(`eventi${queryStr || ''}`);
  }

  

  