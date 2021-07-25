import React, { useState} from "react";


import Container from "../components/Container";
import Fieldset from "../components/forms/Fieldset";
import Input from "../components/forms/Input";
import Button from "../components/Button";
import axiosInstance from "../utils/AxiosApi";

function Login () {
    const [Login, setLogin] = useState({})

    const onHandleSubmit = async (event) => {
        event.preventDefault()
        // await axios.post("http://localhost:5000/api/users", {
        //   formData: form
        // })
        await axiosInstance.get("/signup", {
          loginData: Login
        })
      };

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        // setForm({
        //    ...form,
        //    [name]: value
        // });
        setLogin((prevState) => ({
            ...prevState,
            [name]: value
          })
        )
    }

    return (
        <Container horizontalPadding="1.5rem">
            <form onSubmit={onHandleSubmit}>
                <Fieldset title="Ticket information"> 
                    <Input
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        requiredd
                        onChange={onHandleChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        label="Password"
                        onChange={onHandleChange}
                    />
                </Fieldset>
                <Button type="submit">Submit</Button>
            </form>
        </Container>
    )

}

export default Login