import React, { useState, useEffect } from "react";
// import axios from "axios";
import { Link } from "react-router-dom";

import Container from "../components/Container";
import Fieldset from "../components/forms/Fieldset";
import Input from "../components/forms/Input";
import Button from "../components/Button";
import axiosInstance from "../utils/AxiosApi";


function ComplaintsForm() {
  // const [priority, setPriority] = useState(0);
  const [saving, setSaving] = useState(false);
  const [users, setUsers] = useState([]);
  const [copyFields, setCopyFields] = useState(0);
  const [form, setForm] = useState({})

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await fetch("https://jsonplaceholder.typicode.com/users");
      const users = await result.json()
      setUsers([...users]);
    };
    fetchUsers();
  }, []);

  const onHandleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)

    // await axios.post("http://localhost:5000/api/users", {
    //   formData: form
    // })
    await axiosInstance.post("/users", {
      formData: form
    })

    setSaving(false)
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    // setForm({
    //    ...form,
    //    [name]: value
    // });
    setForm((prevState) => ({
        ...prevState,
        [name]: value
      })
    )
   
  }

  const priorities = ["low", "medium", "high"];

  console.log(form)
  return (
    <Container horizontalPadding="1.5rem">
      <form onSubmit={onHandleSubmit}>
        <Fieldset title="Ticket information">
          <Input 
            name="title" 
            label="Title" 
            placeholder="Title" 
            required 
            onChange={onHandleChange}
          />
          <Input
            name="customerid"
            label="Case ID"
            placeholder="Case-id of customer"
            disabled
            onChange={onHandleChange}
          />
          <Input
            name="copy"
            type="email"
            placeholder="Send copy to"
            label="E-mail copy of ticket"
            onChange={onHandleChange}
          />

          {copyFields > 0 && (
            <div>
              {[...Array(copyFields)].map((_, index) => (
                <Input
                  key={index}
                  name={`copy-${index}`}
                  type="email"
                  placeholder="Send copy to"
                  onChange={onHandleChange}
                />
              ))}
            </div>
          )}

          <Button
            btnType="simple"
            buttonClick={() => setCopyFields((prevState) => prevState + 1)}
          >
            add+
          </Button>

          {copyFields > 0 && (
            <Button
              btnType="simple"
              buttonClick={() => setCopyFields((prevState) => prevState - 1)}
            >
              remove
            </Button>
          )}
        </Fieldset>
        <Fieldset title="Reporter">
            <select name="user" onChange={onHandleChange}>
                <option value="">--Reporter--</option>
                {users.length > 0 &&
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                ))}
            </select>
        </Fieldset>

        <Fieldset title="Settings">
            <p>Priority</p>

            <section className="form-radio-group">
            {priorities.length > 0 &&
                priorities.map((radioItem) => (
                <div className="radio-item" key={radioItem}>
                    <input
                    type="radio"
                    name="prio"
                    value={radioItem}
                    id={`radio-item-${radioItem}`}
                    onChange={onHandleChange}
                    />
                    <label
                    className="form-check-radio"
                    htmlFor={`radio-item-${radioItem}`}
                    >
                    {radioItem}
                    </label>
                </div>
                ))}
            </section>
        </Fieldset>

        <Fieldset>
            <textarea name="description" onChange={onHandleChange}></textarea>
        </Fieldset>
        <Button type="submit">{saving? "Saving" : "Submit"}</Button>
        <Button btnType="secondary" type="button">
            Reset
        </Button>

      </form>
      <Link to="/overview">Go to overview</Link>
    </Container>
  );
}

export default ComplaintsForm;