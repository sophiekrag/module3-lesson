import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Form from "./pages/Form";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup"

import AxiosApi from "./utils/AxiosApi";

import {
  ResetStyles,
  ProjectTheme,
} from "./utils/globalStyles";

function App() {
  const [formData, setFormData] = useState({});
  const [toggleTheme, setToggleTheme] = useState(false);

  useEffect(() => {
    // trigger once (when component is done)
    const fetchData = async () => {
      try{
        const response = await AxiosApi("users");
        console.log("Axios call", response.data);
      }
      catch(error) {console.log(error)}
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    // trigger on dependency
  }, [toggleTheme]);

  const handleFormData = (formData) => {
    setFormData({ ...formData });
  };

  return (
    <ThemeProvider theme={ProjectTheme}>
      <ResetStyles />
      <Header>Iron Hack Complaints Form</Header>

      <Main>
        <Switch>
          <Route exact path="/">
            <Link to="/form">
              <Home />
            </Link>
          </Route>

          <Route path="/form">
            <Form myFormData={handleFormData} />  
          </Route>

          <Route path="/overview">
            <Overview cards={formData} />
          </Route>

          <Route pate="/signup">
            <Signup/>
          </Route>
        </Switch>
      </Main>

      <Footer>&copy; WEB DEV 0321 | Iron Hack </Footer>
    </ThemeProvider>
  );
}

const Main = styled.main`
  flex: 10;
  height: 100%;
`;

export default App;
