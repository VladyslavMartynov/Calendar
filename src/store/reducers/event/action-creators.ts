import { EventActionEnum, SetEventsAction, SetGuestAction } from "./types";
import { IUser } from "../../../models/IUser";
import { IEvent } from "../../../models/IEvent";
import { AppDispatch } from "../../index";
import UserService from "../../../api/UserService";

export const EventActionCreators = {
    setGuests: (guests: IUser []): SetGuestAction => ({
        type: EventActionEnum.SET_GUESTS,
        payload: guests
    }),
    setEvents: (events: IEvent []): SetEventsAction => ({
        type: EventActionEnum.SET_EVENTS,
        payload: events
    }),
    fetchGuests: () => async (dispatch: AppDispatch): Promise<void> => {
        try {
            const response = await UserService.getUsers();
            dispatch(EventActionCreators.setGuests(response.data))
        } catch (e) {
            console.log(e)
        }
    },
    createEvent: (event: IEvent) => (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent[];
            json.push(event);
            dispatch(EventActionCreators.setEvents(json));
            localStorage.setItem('events', JSON.stringify(json));
        } catch (e) {
            console.log(e);
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch): Promise<void> => {
        try {
            const events = localStorage.getItem('events') || '[]';
            const json = JSON.parse(events) as IEvent [];
            const currentUserEvents = json.filter((event) => {
                return event.author === username || event.guest === username;
            });
            dispatch(EventActionCreators.setEvents(currentUserEvents));
        } catch (e) {
            console.log(e)
        }
    }
}