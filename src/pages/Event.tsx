import React, { FC, useEffect, useState} from 'react';
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Button, Layout, Modal, Row } from "antd";
import EventCalendar from "../components/EventCalendar";
import EventForm from "../components/EventForm";
import { IEvent } from "../models/IEvent";

const Event: FC = (): JSX.Element => {
    console.log('render Event');
    const { fetchGuests, createEvent } = useActions();
    const { guests } = useTypedSelector(state => state.event);

    const [modalVisible, setModalVisible] = useState<boolean>(false);

    useEffect(()=> {
        fetchGuests();
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
            <EventCalendar events={[]}/>
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