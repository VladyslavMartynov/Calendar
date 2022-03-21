import React, { FC, useState } from 'react';
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";

const LoginForm: FC = (): JSX.Element => {
    const { login } = useActions();
    const { isLoading, isError } = useTypedSelector(state => state.auth);

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const onSubmit = (): void => {
        login(username, password);
    }

    return (
        <Form
            onFinish={onSubmit}
            initialValues={{ remember: true }}
        >
            {isError && <div style={{color: 'red'}}>{isError}</div>}
            <Form.Item
                label={"Username"}
                name={"username"}
                rules={[rules.require('Please enter your name!')]}
            >
            <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label={"Password"}
                name={"password"}
                rules={[rules.require('Please enter your password!')]}
            >
                <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={"password"}
                />
            </Form.Item>
            <Form.Item >
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;