import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu, Row } from "antd";
import { RouteNames } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Navbar: FC = (): JSX.Element => {
    const { isAuth } = useTypedSelector(({ auth: { isAuth }}) => ({ isAuth }));

    const navigate = useNavigate();

    const onLoginNavigate = (): void => {
        navigate(`${RouteNames.LOGIN}`);
    }

    return (
        <Layout.Header>
            <Row justify={"end"}>
                {isAuth ?
                    <>
                        <div style={{color: 'white'}}>Project</div>
                        <Menu mode={"horizontal"} theme={"dark"} selectable={false}>
                            <Menu.Item key={1} onClick={() => console.log('Exit')}>Exit</Menu.Item>
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