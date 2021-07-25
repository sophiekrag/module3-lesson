import React, { useState} from "react";


import Container from "../components/Container";
import Fieldset from "../components/forms/Fieldset";
import Input from "../components/forms/Input";
import Button from "../components/Button";
import axiosInstance from "../utils/AxiosApi";

function Signup () {
    const [signup, setSignup] = useState({})

    const onHandleSubmit = async (event) => {
        event.preventDefault()
        // await axios.post("http://localhost:5000/api/users", {
        //   formData: form
        // })
        await axiosInstance.post("/signup", {
          signupData: signup
        })
      };

    const onHandleChange = (event) => {
        const { name, value } = event.target;
        // setForm({
        //    ...form,
        //    [name]: value
        // });
        setSignup((prevState) => ({
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
                        name="username" 
                        label="Username" 
                        placeholder="Username" 
                        required 
                        onChange={onHandleChange}
                    />
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

export default Signup