function timeToMins(timeStr) {
    let timeParts = timeStr.split(':');
    let hrsInMinutes = parseInt(timeParts[0], 10) * 60;
    let mins = parseInt(timeParts[1], 10);
    return hrsInMinutes + mins;
}

function extractCourseDetails(course) {
    const termComponents = course.term.split(' ');
    const termValue = termComponents[0];

    const meetsComponents = course.meets.split(' ');
    const daysValue = meetsComponents[0];

    const timeComponents = meetsComponents[1].split('-');
    const startTime = timeToMins(timeComponents[0]);
    const endTime = timeToMins(timeComponents[1]);

    return [termValue, daysValue, startTime, endTime];
}

function conflicting(courseA, courseB) {
    if (courseA === courseB) return false;
    if (!courseA.meets || !courseB.meets) return false;

    const [termA, daysA, startA, endA] = extractCourseDetails(courseA);
    const [termB, daysB, startB, endB] = extractCourseDetails(courseB);

    if (termA !== termB) return false;
    if (startA >= endB || startB >= endA) return false;

    return [...daysA].some(day => daysB.includes(day));
}



export default function isConflicting(course, selectedCourses) {
    return selectedCourses.some(selectedCourse => conflicting(course, selectedCourse));
}