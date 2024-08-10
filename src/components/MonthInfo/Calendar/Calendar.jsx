import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';

const isValidDate = dateString => {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
};

const Calendar = ({ month, date, onClick }) => {
  if (month.length === 0) return null;

  return (
    <ul className={css.calendar}>
      {month.map((day, index) => {
        const percentageString = day.percentageConsumed || '0%';

        return (
          <CalendarItem
            key={index}
            date={{ day: day.date, percentageConsumed: percentageString }} // Передаем объект с day и percentageConsumed
            isCurrentDay={day.date === date}
            isSelectedDay={day.date === date}
            onClick={() => {
              if (isValidDate(day.date)) {
                onClick(day.date);
              } else {
                console.error('Invalid date value:', day.date);
              }
            }}
          />
        );
      })}
    </ul>
  );
};

export default Calendar;
