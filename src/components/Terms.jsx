import TermSelector from "./TermButtons";
import CourseList from "./CourseList/CourseList";
import { useState } from "react";

const Terms = ({ courses }) => {
    const [currentTerm, setTerm] = useState("Fall");
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => {
        if (selected.includes(item)) {
            const newSelected = selected.filter(x => x !== item);
            setSelected(newSelected);
        } else {
            setSelected([...selected, item]);
        }
    };
    

    return (
        <>
            <TermSelector term={currentTerm} setTerm={setTerm}/>
            <CourseList courses={courses} term={currentTerm} selected={selected} toggleSelected={toggleSelected}/>
        </>
    )
}

export default Terms;