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
        events: [action.addedEventi, ...state.events]
      };
    case 'EVENT_REMOVE':
      return {
        ...state,
        events: state.events.filter(eventi => {
          return eventi._id !== action.eventiId
        })
      };
    case 'EVENT_UPDATE':
      return {
        ...state,
        events: state.events.map(eventi =>
          eventi._id === action.eventi._id ? action.eventi : eventi
        )
      };
    default:
      return state;
  }
}

