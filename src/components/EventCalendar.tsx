import React, { FC } from 'react';
import { Calendar } from "antd";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = ({ events }): JSX.Element => {

    const dataCellRender = (value: Moment) => {
        const formattedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter((event) => {
            return event.date === formattedDate;
        })
        return (
            <div>
                {currentDayEvents.map((event, index) =>
                    <li key={index}>
                        {event.description}
                    </li>
                )}

            </div>
        )
    }

    return (
        <Calendar dateCellRender={dataCellRender}/>
    );
};

export default EventCalendar;