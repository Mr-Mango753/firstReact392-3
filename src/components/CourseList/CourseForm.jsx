import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useState } from 'react';
import { useDbUpdate } from '../../utilities/firebase';
import "./CourseForm.css";

const InputField = ({ name, text, course, onChange }) => {
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
        value={defaultValue}
        onChange={onChange}
      />
    </div>
  );
};

const ButtonBar = ({ onSubmit }) => {
  const navigate = useNavigate();

  const handleCancelClick = () => {
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
      <button
        type="button"
        className="btn btn-outline-dark me-2"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const CourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({ title: '', meets: '' });
  const [errors, setErrors] = useState({ title: '', meets: '' });
  const [update, result] = useDbUpdate(`/courses/${courseId}`);

  const handleSubmitClick = async () => {
    if (errors.title === "" && errors.meets === "") { 
      try {
        await update(course);
        navigate("/");
      } catch (error) {
        console.error("can't update course -- ", error);
      }
    }
  };

  function validateTitle(title) {
    if (title.length < 2) {
      return "Title must be at least two characters.";
    }
    return "";
  }

  function validateMeetingTime(meets) {
    const regex = /^[MTWRF]+\s\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (meets === "") return "";
    if (!regex.test(meets)) {
      return "Must contain days and start-end, e.g., MWF 12:00-13:20";
    }
    return "";
  }

  function handleInputChange(event) {
    const { name, value } = event.target;

    setCourse(prev => ({ ...prev, [name]: value }));

    if (name === "title") {
      setErrors(prev => ({ ...prev, title: validateTitle(value) }));
    } else if (name === "meets") {
      setErrors(prev => ({ ...prev, meets: validateMeetingTime(value) }));
    }
  }

  return (
    <form noValidate>
      <InputField
        name="title"
        text="Title"
        course={course}
        onChange={handleInputChange}
      />
      {errors.title && <div className="error">{errors.title}</div>}
      <InputField
        name="meets"
        text="Meeting Time"
        course={course}
        onChange={handleInputChange}
      />
      {errors.meets && <div className="error">{errors.meets}</div>}
      <ButtonBar onSubmit={handleSubmitClick} />
    </form>
  );
};

export default CourseForm;
