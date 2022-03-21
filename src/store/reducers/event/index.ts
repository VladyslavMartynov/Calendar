import {EventActionEnum, EventActions, IEventState} from "./types";

const initialState: IEventState = {
    guests: [],
    events: []
}

function EventReducer(state = initialState, action: EventActions): IEventState {
    switch (action.type) {
        case EventActionEnum.SET_GUESTS:
            return {...state, guests: action.payload}
        case EventActionEnum.SET_EVENTS:
            return {...state, events: action.payload}
        default:
            return initialState
    }
}

export default EventReducer