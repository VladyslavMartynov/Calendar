import React, { FC } from 'react';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Row } from "antd";
import { RouteNames } from "../router";
import { useActions } from "../hooks/useActions";

const Navbar: FC = (): JSX.Element => {
    const { logout } = useActions();
    const navigate = useNavigate();
    const { isAuth, user } = useTypedSelector(({ auth: { isAuth, user }}) => ({ isAuth, user }));

    const onLoginNavigate = (): void => {
        navigate(`${RouteNames.LOGIN}`);
    }

    const onExitClick = (): void => {
        logout();
    }

    return (
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth ?
                    <>
                        <div style={{color: 'white'}}>{user.username}</div>
                        <Menu mode={"horizontal"} theme={"dark"} selectable={false}>
                            <Menu.Item key={1} onClick={onExitClick}>Exit</Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu mode={"horizontal"} theme={"dark"} selectable={false}>
                        <Menu.Item key={1} onClick={onLoginNavigate}>Login</Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;