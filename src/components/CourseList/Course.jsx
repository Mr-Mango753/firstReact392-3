import React, { useState, useEffect } from 'react';
import './CourseList.css';
import { useAuthState, isAdmin } from '../../utilities/firebase';
import { Link } from 'react-router-dom';


const Course = ({ course, selected, toggleSelected }) => {
  const user = useAuthState();
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const isAdminResult = await isAdmin(user.uid);
        setIsAdminUser(isAdminResult);
        console.log("is admin", isAdminResult);
      }
    };
    checkAdminStatus();
  }, [user]);

  return (
    <div 
        className={`courseCard card-body${selected.includes(course) ? ' selected' : ''}`} 
        onClick={() => toggleSelected(course)}
    >
        <span className="courseHeader">{course.term} CS {course.number}</span> 
        <span>{course.title}</span>
        <hr />
        <span>{course.meets}</span>

        {isAdminUser && (
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
