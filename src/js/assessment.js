// input {
//    attendance: 100.0,
//    homework: calculatePercent([[12,12], [14,14]]),
//    final: calculatePercent([[10,10], [6,6], [3,3], [4,4], [4,4]])
// }
// output 100%
function getApiCoursePercent(params = {}) {
  const {
    attendance: attendanceMarkOf100 = 100,
    homework: homeworkMarkOf100 = 0,
    final: finalMarkOf100 = 0,
  } = params;
  const attendanceWeight = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);
  const homeworkWeight = ((homeworkMarkOf100 / 100) * (27 / 100) * 100);
  const finalWeight = ((finalMarkOf100 / 100) * (4 / 10) * 100);

  return Math.round(attendanceWeight + homeworkWeight + finalWeight);
}

function getJqueryCoursePercent(skillMarkOf100, attendanceMarkOf100 = 100) {
  const skills = ((skillMarkOf100 / 100) * (2 / 3) * 100);
  const attendance = ((attendanceMarkOf100 / 100) * (1 / 3) * 100);

  return Math.round(skills + attendance);
}

// input [[1,2], [8,16]]
// output 50%
function calculatePercent(marks) {
  let earned = 0;
  let total = 0;

  marks.forEach((mark) => {
    earned += mark[0];
    total += mark[1];
  });

  return Math.round((earned / total) * 100);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    getApiCoursePercent,
    getJqueryCoursePercent,
    calculatePercent,
  };
}
