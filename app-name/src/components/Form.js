import React, { Component, useState } from "react";

function FormComponent() {
  const [first_name, setFirstName] = useState("");
  function changeInput(event) {
    setFirstName(event.target.value);
  }
  return (
    <>
      <form>
        <div>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={changeInput}
          ></input>
        </div>
      </form>
    </>
  );
}

class UserForm extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
  };
  render() {
    return (
      <>
        <h1>Registration</h1>
        <form
          name="registration-form"
          method="post"
          onSubmit={this.handleSubmit}
        >
          <div>
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              defaultValue={this.state.first_name}
            ></input>
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              defaultValue={this.state.last_name}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input type="email" name="email" value=""></input>
          </div>
          <div>
            <label>Password</label>
            <input type="password" name="password" value=""></input>
          </div>
          <div>
            <button name="registration-form" onClick={() => this.handleSubmit}>
              Save
            </button>
          </div>
        </form>
      </>
    );
  }
}

export { FormComponent, UserForm };
