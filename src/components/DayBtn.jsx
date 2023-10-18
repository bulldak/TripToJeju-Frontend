function DayBtn(props) {
  return (
    <div className="DayBtn">
      {props.duration === 1 ? (
        <button
          id="one"
          className={props.selectedDay === 1 ? "selected" : ""}
          onClick={() => props.onDayClick(1)}
        >
          Day 1
        </button>
      ) : props.duration === 2 ? (
        <>
          <button
            id="two"
            className={props.selectedDay === 1 ? "selected" : ""}
            onClick={() => props.onDayClick(1)}
          >
            Day 1
          </button>
          |
          <button
            id="two"
            className={props.selectedDay === 2 ? "selected" : ""}
            onClick={() => props.onDayClick(2)}
          >
            Day 2
          </button>
        </>
      ) : (
        <>
          <button
            id="three"
            className={props.selectedDay === 1 ? "selected" : ""}
            onClick={() => props.onDayClick(1)}
          >
            Day 1
          </button>
          |
          <button
            id="three"
            className={props.selectedDay === 2 ? "selected" : ""}
            onClick={() => props.onDayClick(2)}
          >
            Day 2
          </button>
          |
          <button
            id="three"
            className={props.selectedDay === 3 ? "selected" : ""}
            onClick={() => props.onDayClick(3)}
          >
            Day 3
          </button>
        </>
      )}
    </div>
  );
}
export default DayBtn;
