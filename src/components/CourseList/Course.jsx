import React from 'react';
import './CourseList.css'
import { useAuthState } from '../../utilities/firebase'; 
import { Link } from 'react-router-dom'; 

const Course = ({ course, selected, toggleSelected }) => {
  const user = useAuthState();

  return (
    <div 
        className={`courseCard card-body${selected.includes(course) ? ' selected' : ''}`} 
        onClick={() => toggleSelected(course)}
    >
        <span className="courseHeader">{course.term} CS {course.number}</span> 
        <span>{course.title}</span>
        <hr />
        <span>{course.meets}</span>

        {user && (
          <Link 
            className="btn btn-primary" 
            to={`/edit-course/${course.term[0]}${course.number}`}
            onClick={(e) => {
              e.stopPropagation();
              const element = document.getElementById("bottom");
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Edit
          </Link>
        )}

    </div>
  );
};

export default Course;
