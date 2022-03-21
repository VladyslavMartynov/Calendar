import React, { FC } from 'react';
import { Layout } from "antd";
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import './App.css';

const App: FC = (): JSX.Element => {
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
