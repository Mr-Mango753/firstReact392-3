import { Routes, Route } from "react-router-dom";
import CourseForm from "./CourseForm";
import { useParams } from 'react-router-dom';

const CourseFormWrapper = ({ data }) => {
    const { courseId } = useParams();
    const course = data.courses[courseId];

    if (!course) {
      return <div>404</div>;
    }
    return <CourseForm course={course} />;
  }

const Dispatcher = ({data}) => (
        <Routes>
            <Route path="/edit-course/:courseId" element={<CourseFormWrapper data={data} />} />
        </Routes>
);

export default Dispatcher;