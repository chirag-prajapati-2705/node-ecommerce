import React, { useState } from "react";
import Hello from "./Hello";
import Message from "./Message";
import Counter from "./Counter";
import ConditionalComponent from "./ConditionalComponent";
import ProductList from "./Product";
import { FormComponent, UserForm } from "./Form";

function AppName(props) {
  return <p>{props.name}</p>;
}

function AppCounter() {
  const [counter, setCounter] = useState(0);

  function increament() {
    setCounter(counter + 1);
  }
  return (
    <div>
      <div>Hello counter component : {counter}</div>
      <button onClick={increament}>Click On Button</button>
    </div>
  );
}

function MainComponent() {
  return (
    <div>
      {/* <AppName name="Hello My Name is Chirag Prajapati"></AppName>
      <AppCounter></AppCounter>
      <Hello></Hello>
      <Message message="Hello I am looking for the new change"></Message>
      <p></p>
      <Counter name="counter value"></Counter>
      <p></p>
      <ConditionalComponent></ConditionalComponent>
      <ProductList></ProductList> */}
      <FormComponent></FormComponent>
      <UserForm></UserForm>
    </div>
  );
}

export default MainComponent;
