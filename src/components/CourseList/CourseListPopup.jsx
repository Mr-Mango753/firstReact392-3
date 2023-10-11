export const CourseCart = ({selected}) => (
    <div className="course-cart">
        {
            selected.length === 0 ?
            <h1>No selected courses. Choose from the list of courses below to populate this window.</h1>
            : selected.map(course => {
                return(
                    <div>
                        CS {course.number}: {course.title}, {course.meets}
                    </div>
                );
            })
        }
    </div>
)

export default CourseCart;