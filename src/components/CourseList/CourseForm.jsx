import React from 'react';
import { useNavigate } from "react-router-dom";
import "./CourseForm.css";

const InputField = ({ name, text, course }) => {
    let defaultValue;
  
    if (name === "title") {
      defaultValue = course.title;
    } else if (name === "meets") {
      defaultValue = course.meets;
    } else {
      defaultValue = "";
    }
  
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {text}
        </label>
        <input
          className="form-control"
          id={name}
          name={name}
          defaultValue={defaultValue}
        />
      </div>
    );
  };

  const ButtonBar = () => {
    const navigate = useNavigate();
  
    const handleCancelClick = () => {
      navigate("/");
    };
  
    const handleSubmitClick = () => {
      navigate("/");
    };
  
    return (
      <div className="d-flex">
        <button
          type="button"
          className="btn btn-outline-dark me-2"
          onClick={handleCancelClick}
        >
          Cancel
        </button>
  
      </div>
    );
  };
  

const CourseForm = ({ course }) => {
  return (
    <form noValidate>
      <InputField name="title" text="Title" course={course} />
      <InputField name="meets" text="Meeting Time" course={course} />
      <ButtonBar />
    </form>
  );
};

export default CourseForm;
