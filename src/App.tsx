import React, { FC, useEffect } from 'react';
import { Layout } from "antd";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import './App.css';

const App: FC = (): JSX.Element => {
    const { setUser, setAuth } = useActions();
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setUser({
                username: localStorage.getItem('username')
            } as IUser);
            setAuth(true);
        }
    }, [setAuth, setUser])

  return (
      <Layout>
        <Navbar/>
        <Layout.Content>
          <AppRouter/>
        </Layout.Content>
      </Layout>
  )
}

export default App;
