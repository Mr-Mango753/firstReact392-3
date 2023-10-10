import TermSelector from "./TermButtons";
import CourseList from "./CourseList/CourseList";
import { useState } from "react";

const Terms = ({ courses }) => {
    const [currentTerm, setTerm] = useState("Fall");

    return (
        <>
            <TermSelector term={currentTerm} setTerm={setTerm}/>
            <CourseList courses={courses} term={currentTerm}/>
        </>
    )
}

export default Terms;