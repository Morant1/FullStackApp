
import httpService from './httpService';

export const eventiService = {
    query

}

function query() {
    return httpService.get('eventi');
  }

  