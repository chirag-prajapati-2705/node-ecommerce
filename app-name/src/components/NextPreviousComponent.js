import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import _ from "lodash";

function OptionButtonGroup(props) {
    let selectedOption = null;
    const selectedOptions = _.find(props.responseData, function (obj) {
        return obj.question == props.current_question.id;
    });

    if (!_.isUndefined(selectedOptions)) {
        selectedOption = selectedOptions.option;
    }

    return (
        <>
            {props.options.map((option, index) => (
                <div className="list-group-item list-group-item-action " aria-current="true"
                     key={index + "" + props.current_question.id}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio" name="options[]"
                               defaultChecked={selectedOption == option.id} value={option.id}
                               id={option.id} onChange={props.handleChange}></input>
                        <label className="form-check-label stretched-link" htmlFor={option.id}>
                            {option.title}
                        </label>
                    </div>
                </div>
            ))}
        </>
    )
}

function NextPreviousComponent() {
    const all_questions = [
        {
            id: 1, title: "Which of these keywords are access specifiers?", options: [
                {id: 1, title: 'near and far'},
                {id: 2, title: 'opened and closed'},
                {id: 3, title: 'table and row'},
                {id: 4, title: 'none of these'}
            ],
        },
        {
            id: 2, title: "Use of ______protects data from inadvertent modifications", options: [
                {id: 1, title: 'protect() member function'},
                {id: 2, title: 'private access specifier'},
                {id: 3, title: 'class protection operator, @'},
                {id: 4, title: 'public access specifier'}

            ]
        },
        {
            id: 3, title: "Entomology is the science that studies", options: [
                {id: 1, title: 'Behavior of human beings'},
                {id: 2, title: 'Insects'},
                {id: 3, title: 'The origin and history of technical and scientific terms'},
                {id: 4, title: 'The formation of rocks'}
            ]
        },
    ];
    const [index, setIndex] = useState(0);
    const [response, setResponse] = useState([]);
    const [progressBar, setProgressBar] = useState(0);
    const [submit, setSubmit] = useState(false);

    function handleChange(event) {
        const getIndex = _.findIndex(response, function (o) {
            return o.question == all_questions[index].id;
        });
        const replacement = {question: all_questions[index].id, option: event.target.value}
        if (getIndex == -1) {
            response.push({question: all_questions[index].id, option: event.target.value});
            setResponse(response);
        } else {
            response[getIndex] = replacement;
        }
    }

    function getPrevious() {
        if (index == 0) {
            return
        }
        setIndex(index - 1);
        let progressBarValue = ((index - 1) / all_questions.length) * 100;
        setProgressBar(progressBarValue);
    }

    function getNext() {
        if ((index + 1) == all_questions.length) {
            return;
        }
        setIndex(index + 1);
        let progressBarValue = ((index + 1) / all_questions.length) * 100;
        setProgressBar(progressBarValue);
    }

    var question = all_questions[index];

    function handleSubmit() {
        setSubmit(true);
    };
    let template;
    if (submit) {
        template = <div className="card-body p-10 text-center">
            <div className="mb-4 ">
                <h2>🎉 Congratulations. You passed!</h2>
                <p className="mb-0 px-lg-14">You are successfully completed the quiz. Now you click on
                    finish and back to your quiz page.</p>
            </div>
        </div>;
    } else {

        template = <div>
            <div className="card-body">
                <div className="mt-3">
                    <div className="d-flex justify-content-between">
                        <span>Exam Progress: </span>
                        <span> Question {index + 1} out of {all_questions.length}</span>
                    </div>
                    <div className="mt-2">
                        <div className="progress">
                            <div className="progress-bar bg-success" role="progressbar"
                                 style={{width: progressBar + '%'}}
                                 aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <span>Question {index + 1}</span>
                    <h3 className="mb-3 mt-1" key={question.id}>{question.title}</h3>
                    <div className="list-group">
                        <OptionButtonGroup options={question.options} current_question={question}
                                           handleChange={handleChange} responseData={response}></OptionButtonGroup>
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-secondary" onClick={getPrevious}><i
                    className="fe fe-arrow-left"></i> Previous
                </button>
                <button className={index + 1 == all_questions.length ? 'btn btn-primary hidden' : 'btn btn-primary'}
                        onClick={getNext}>
                    Next <i className="fe fe-arrow-right"></i>
                </button>
                <button className={index + 1 == all_questions.length ? 'btn btn-primary' : 'btn btn-primary hidden'}
                        onClick={handleSubmit}>Submit
                </button>
            </div>
            ;

        </div>
    }


    return (<>
        {template}
    </>)
}

function SubmitQuiz(props) {
    //console.log(props.total_index, props.current_index);
    if (props.total_index == props.current_index + 1) {
        return (<button className="btn btn-primary">Submit</button>)
    }
    return (<></>);


}

export default NextPreviousComponent;
