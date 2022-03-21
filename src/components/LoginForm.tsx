import React, { FC, useState } from 'react';
import { Button, Form, Input } from "antd";
import { rules } from "../utils/rules";
import { useDispatch } from "react-redux";
import { AuthActionCreators } from "../store/reducers/auth/action-creators";
import { useTypedSelector } from "../hooks/useTypedSelector";

const LoginForm: FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const { isLoading, isError } = useTypedSelector(state => state.auth);
    console.log(isError);
    console.log(isLoading)

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const submit = (): void => {
        dispatch(AuthActionCreators.login(username, password));
    }


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    }


    return (
        <Form
            onFinish={submit}
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
        >
            {isError && <div>{isError}</div>}
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