import { eventiService } from '../../services/eventiService'

export function loadEventis(filterBy = {}) {
  return async dispatch => {
    try {
      console.log(filterBy)
      const eventis = await eventiService.query(filterBy);
      dispatch({ type: 'SET_EVENTIS', eventis });

    } catch (err) {
      console.log('EventActions: err in loadEventis', err);
    }
  };
}

// export function addEventi(eventi) {
//   return async dispatch => {
//     try {
//       eventi.createdBy ={
//         "_id": "u101",
//         "username": "guest",
//         // Lior, imgUrl should be [Tag.jpg,userUpload] 
//         "imgUrl": "https://image.shutterstock.com/image-photo/portrait-smiling-red-haired-millennial-260nw-1194497251.jpg"
//       }
// /*       eventi.startsAt = Date.parse(eventi.startsAt) */
//       eventi.createdAt = Date.now();
//       eventi.location = eventi.location.split(',');
//       const location = new Map([
//         ['city', eventi.location[0]],
//         ['country',eventi.location[1]]
//       ]);
//       var tags = new Array(eventi.tags);
//       eventi.tags = tags;
//       eventi.location =  Object.fromEntries(location);
//       eventi.participants = [];
//       eventi.comments = [];
//       eventi.rank = 0;
//       /* eventi.createdby = {}; */
//       const addedEventi = await eventService.save(eventi);
//       console.log("Added eventi ", addedEventi)
//       dispatch({ type: 'EVENT_ADD', addedEventi });
//     } catch (err) {
//       console.log('eventActions: err in addEvent', err);
//     }
//   };
// }


export function updateEventi(eventi) {
  return async dispatch => {
    try {
      console.log("Eventi inside action " + eventi)
      const updatedEventi = await eventiService.save(eventi);
      dispatch({ type: 'EVENTI_UPDATE', eventi: updatedEventi });
    } catch (err) {
      console.log('eventActions: err in updateEventi', err);
    }
  };
}


// export function removeEventi(eventiId) {
//   return async dispatch => {
//     try {
//       await eventService.remove(eventiId);
//       dispatch({ type: 'EVENT_REMOVE', eventiId });
//     } catch (err) {
//       console.log('eventActions: err in removeEventi', err);
//     }
//   };
// }



