import React from 'react';
import './CourseList.css'

const CourseList = ({ courses, term }) => {
  return (
    <div className="courseList">
      {Object.values(courses).filter(course => course.term == term).map(course => (
        <div className="courseCard">
        <div key={course.number}>
            <span className="courseHeader">{course.term} CS {course.number}</span> <span>{course.title}</span>
        </div>
        <div>
            <hr />
            <span>{course.meets}</span>
        </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;