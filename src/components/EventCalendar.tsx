import React, { FC } from 'react';
import { Calendar } from "antd";
import { IEvent } from "../models/IEvent";

interface EventCalendarProps {
    events: IEvent[]
}

const EventCalendar: FC<EventCalendarProps> = (): JSX.Element => {
    return (
        <Calendar />
    );
};

export default EventCalendar;