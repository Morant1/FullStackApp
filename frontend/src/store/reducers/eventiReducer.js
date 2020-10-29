const initialState = {
  eventis: []
};

export function eventiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SET_EVENTIS':
      return { ...state, eventis: action.eventis };
    case 'EVENT_ADD':
      return {
        ...state,
        eventis: [action.addedEventi, ...state.eventis]
      };
    case 'EVENT_REMOVE':
      return {
        ...state,
        eventis: state.events.filter(eventi => {
          return eventi._id !== action.eventiId
        })
      };
    case 'EVENTI_UPDATE':
      return {
        ...state,
        eventis: state.eventis.map(eventi =>
          eventi._id === action.eventi._id ? action.eventi : eventi
        )
      };
    default:
      return state;
  }
}

