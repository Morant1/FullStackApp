import { eventiService } from '../../services/eventiService'

export function loadEventis(filterBy = {}) {
  return async dispatch => {
    try {
      const eventis = await eventiService.query(filterBy);
      dispatch({ type: 'SET_EVENTIS', eventis });

    } catch (err) {
      console.log('EventActions: err in loadEventis', err);
    }
  };
}



export function updateEventi(eventi) {
  return async dispatch => {
    try {
      const updatedEventi = await eventiService.save(eventi);
      dispatch({ type: 'EVENTI_UPDATE', eventi: updatedEventi });
    } catch (err) {
      console.log('eventActions: err in updateEventi', err);
    }
  };
}

export function addEventi(eventi) {
  return async dispatch => {
    try {
      const addedEventi = await eventiService.save(eventi);
      dispatch({ type: 'EVENTI_ADD', eventi: addedEventi });
    } catch (err) {
      console.log('eventActions: err in addEventi', err);
    }
  };
}


export function removeEventi(eventiId) {
  return async dispatch => {
    try {
      await eventiService.remove(eventiId);
      dispatch({ type: 'EVENT_REMOVE', eventiId });
    } catch (err) {
      console.log('eventActions: err in removeEventi', err);
    }
  };
}



