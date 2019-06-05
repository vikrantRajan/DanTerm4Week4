function getDateDay(date) {
  const d = new Date(date);
  let month = (d.getMonth() + 1).toString();
  let day = d.getDate().toString();
  const year = d.getFullYear();

  if (month.length < 2) month = `0${month}`;
  if (day.length < 2) day = `0${day}`;

  return [year, month, day].join('-');
}

function getDateStart(date) {
  return `${getDateDay(date)} 09:00:00`;
}

function getDateEnd(date) {
  return `${getDateDay(date)} 12:17:00`;
}

function getDateEndLong(date) {
  return `${getDateDay(date)} 12:35:00`;
}

function createCourseSchedule(courseTitle = 'Dan\'s class') {
  const classes = [];
  const weeklyClassInterval = Array(11).fill(7);
  let classCount = weeklyClassInterval.length;
  let betweenClasses = weeklyClassInterval;
  let nextDate = new Date();

  const course = {
    getAllClasses: () => {
      while (betweenClasses.length > 0) {
        classes.push(course.getNextClass());
      }

      return classes;
    },
    getNextClass: () => {
      const day = getDateDay(nextDate);
      const start = getDateStart(nextDate);
      const end = (courseTitle === 'jQuery') ? getDateEnd(nextDate) : getDateEndLong(nextDate);
      const title = `${courseTitle} ${(classCount - betweenClasses.length) + 1}`;

      const daysNextClass = betweenClasses.splice(0, 1);
      nextDate.setHours(24 * daysNextClass);

      return {
        title, day, start, end,
      };
    },
    setDaysBetweenClasses: (between) => {
      classCount = between.length;
      betweenClasses = Array.from(between);
      return course;
    },
    setFirstClassDate: (date) => {
      nextDate = new Date(date.getTime());
      return course;
    },
  };

  return course;
}

function courseCalendar() {
  const firstDateJq = new Date(2019, 3, 3); // Apr 3
  const courseJq = createCourseSchedule('jQuery')
    .setFirstClassDate(firstDateJq)
    .setDaysBetweenClasses([3, 4, 3, 4, 7, 7, 7, 7, 7, 7, 7]);

  const firstDateApi = new Date(2019, 5, 5); // Jun 5
  const courseApi = createCourseSchedule('API')
    .setFirstClassDate(firstDateApi)
    .setDaysBetweenClasses([7, 7, 7, 7, 7, 7, 7, 7, 7, 7]);
  const events = courseJq.getAllClasses().concat(courseApi.getAllClasses());

  // Update times specifically on weekend
  events[1].start = '2019-04-06 10:30:00';
  events[1].end = '2019-04-06 13:45:00';

  events[3].start = '2019-04-13 10:30:00';
  events[3].end = '2019-04-13 13:45:00';

  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek',
    },
    firstDay: 1, // Monday start
    defaultDate: getDateDay(new Date()),
    navLinks: true, // can click day/week names to navigate views
    editable: true,
    eventLimit: true, // allow "more" link when too many events
    events,
  });
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    courseCalendar,
    getDateDay,
    getDateStart,
    getDateEnd,
    createCourseSchedule,
  };
}
