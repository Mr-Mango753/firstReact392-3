import TermSelector from "./TermButtons";
import CourseList from "./CourseList/CourseList";
import { useState } from "react";
import Modal from './Modal/Modal.jsx';
import CourseListPopup from './CourseList/CourseListPopup.jsx';

const Terms = ({ courses }) => {
    const [currentTerm, setTerm] = useState("Fall");
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const toggleSelected = (item) => {
        if (selected.includes(item)) {
            const newSelected = selected.filter(x => x !== item);
            setSelected(newSelected);
        } else {
            setSelected([...selected, item]);
        }
    };
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);
    
    return (
        <>
            <button className="btn btn-outline-dark" onClick={openModal}>
        Course Plan
      </button>
            <Modal open={open} close={closeModal}>
                <CourseListPopup courses={courses} selected={selected}/>
            </Modal>
            <TermSelector term={currentTerm} setTerm={setTerm}/>
            <CourseList courses={courses} term={currentTerm} selected={selected} toggleSelected={toggleSelected}/>
        </>
    )
}

export default Terms;