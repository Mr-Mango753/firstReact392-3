import React from 'react';

const CourseList = ({ courses }) => {
  return (
    <ul>
      {Object.values(courses).map(course => (
        <li key={course.number}>
            {course.term} CS {course.number}: {course.title}
        </li>
      ))}
    </ul>
  );
};

export default CourseList;