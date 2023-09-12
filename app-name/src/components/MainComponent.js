import React, {useState} from "react";
import Hello from "./Hello";
import Message from "./Message";
import Counter from "./Counter";
import ConditionalComponent from "./ConditionalComponent";
import ProductList from "./Product";
import {FormComponent, UserForm} from "./Form";
import NextPreviousComponent from "./NextPreviousComponent";


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
    return (<>
            <div className="container">
                <div className="row align-items-center">
                </div>
                <div class="row mt-0 mt-md-4">
                    <div className="col-lg-3 col-md-4 col-12">

                    </div>
                    <div class="col-lg-9 col-md-8 col-12">
                        {/* <AppName name="Hello My Name is Chirag Prajapati"></AppName>*/}
                        {/*<AppCounter></AppCounter>*/}
                        {/*<Hello></Hello>*/}
                        {/*<Message message="Hello I am looking for the new change"></Message>*/}
                        {/*<p></p>*/}
                        {/*<Counter name="counter value"></Counter>*/}
                        {/*<p></p>*/}
                        {/*<ConditionalComponent></ConditionalComponent>*/}
                        {/*<ProductList></ProductList> *!/*/}
                        {/*<FormComponent></FormComponent>*/}
                        {/*<UserForm></UserForm>*/}
                        <NextPreviousComponent></NextPreviousComponent>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainComponent;
