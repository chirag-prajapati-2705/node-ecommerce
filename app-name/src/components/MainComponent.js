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
                        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                            <div className="d-flex align-items-center">
                                <a href="#"> <img src="course-react.jpg" alt="course"
                                                  className="rounded img-4by3-lg"></img>
                                </a>
                                <div className="ms-3">
                                    <h3 className="mb-0"><a href="#" className="text-inherit">React Basic Quiz </a></h3>

                                </div>
                            </div>
                            <div>
                            <span className="text-danger"><i
                                className="fe fe-clock me-1 align-middle"></i></span>
                            </div>
                        </div>
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
