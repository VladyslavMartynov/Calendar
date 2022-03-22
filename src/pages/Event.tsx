import React, { FC, useEffect, useState } from 'react';
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Button, Layout, Modal, Row } from "antd";
import { IEvent } from "../models/IEvent";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";

const Event: FC = (): JSX.Element => {
    const { fetchGuests, createEvent, fetchEvents } = useActions();
    const { guests, events } = useTypedSelector(state => state.event);
    const { user } = useTypedSelector(state => state.auth);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=> {
        fetchGuests();
        fetchEvents(user.username);
    }, [])

    const onToggleModal = (): void => {
        setModalVisible(prev => !prev);
    }

    const addNewEvent = (event: IEvent): void => {
        onToggleModal();
        createEvent(event);
    }

    return (
        <Layout>
            <EventCalendar events={events}/>
            <Row justify={"center"}>
                <Button onClick={onToggleModal}>Add Event</Button>
            </Row>
            <Modal
                title={"Add Event"}
                visible={modalVisible}
                footer={null}
                onCancel={onToggleModal}
            >
                <EventForm guests={guests} submit={addNewEvent}/>
            </Modal>
        </Layout>
    );
};

export default Event;