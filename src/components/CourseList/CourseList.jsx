import React from 'react';
import './CourseList.css'
import Course from './Course.jsx'

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  return (
    <div className="courseList">
    {
      Object.values(courses)
        .filter(course => course.term === term)
        .map(course => (
          <Course 
            key={course.number} 
            course={course} 
            selected={selected} 
            toggleSelected={toggleSelected}
          />
        ))
    }
  </div>
  );
};

export default CourseList;