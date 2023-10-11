import React from 'react';
import './CourseList.css'

const Course = ({ course, selected, toggleSelected }) => {
  return (
    <div 
        className={`courseCard card-body${selected.includes(course) ? ' selected' : ''}`} 
        onClick={() => toggleSelected(course)}
    >
        <span className="courseHeader">{course.term} CS {course.number}</span> 
        <span>{course.title}</span>
        <hr />
        <span>{course.meets}</span>
    </div>
  );
};

export default Course;
