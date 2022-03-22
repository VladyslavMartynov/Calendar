import React, { FC, useState, ChangeEvent } from 'react';
import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import { rules } from "../utils/rules";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser [];
    submit: (event: IEvent) => void
}

const EventForm: FC<EventFormProps> = ({ guests, submit }): JSX.Element => {
    const { user } = useTypedSelector(state => state.auth)
    const [event, setEvent] = useState<IEvent>({
        author: '',
        date: '',
        description: '',
        guest: ''
    });


    const selectDate = (date: Moment | null): void => {
        if (date) {
            setEvent(event => ({
                ...event,
                date: formatDate(date.toDate())
            }))
        }
    }

    const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;
        setEvent(event => ({
            ...event,
            description: value
        }))
    }

    const onSubmit = (): void => {
        submit({...event, author: user.username})
    }


    return (
        <Form onFinish={onSubmit}>
            <Form.Item
                label={"Event description"}
                name={"description"}
                rules={[rules.require()]}
            >
                <Input
                    onChange={onDescriptionChange}
                    value={event.description}
                />
            </Form.Item>
            <Form.Item
                label={"Choose Date"}
                name={"date"}
                rules={[rules.require(), rules.isDateAfter('You can not create event in the past!')]}
            >
                <DatePicker onChange={(date) => selectDate(date)}/>
            </Form.Item>
            <Form.Item
                label={"Choose guest"}
                name={"guest"}
                rules={[rules.require()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest})}>
                    {guests.map((guest) => (
                        <Select.Option key={guest.username} value={guest.username}>
                            {guest.username}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item >
                <Row justify={"center"}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Row>
            </Form.Item>
        </Form>
    );
};

export default EventForm;