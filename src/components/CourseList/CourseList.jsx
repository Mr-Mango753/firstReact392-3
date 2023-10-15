import React from 'react';
import './CourseList.css'
import Course from './Course.jsx'
import isConflicting from '../../utilities/conflictFunctions.jsx'

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  const conflictingCourses = Object.values(courses).filter((course) =>
    isConflicting(course, Array.isArray(selected) ? selected : [])
);

return (
  <div className="courseList">
  {
    Object.values(courses)
      .filter(course => course.term === term)
      .map(course => {
        if (conflictingCourses.includes(course) && !selected.includes(course)) { 
          return (
            <div className="unselectable" key={course.number}>
              <Course 
                course={course}
                selected={selected}
                toggleSelected={toggleSelected}
              />
            </div>
          );
        } else {
          return (
            <Course 
              key={course.number}
              course={course}
              selected={selected}
              toggleSelected={toggleSelected}
            />
          );
        }
      })
  }
</div>
);
};

export default CourseList;