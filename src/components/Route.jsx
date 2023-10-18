import PlaceWithBtn from "./PlaceWithBtn";

function Route(props) {
  // 선택된 날짜에 따라 다른 내용을 보여줌
  const renderRouteContent = () => {
    if (props.selectedDay === 1) {
      //const items = props.responseData.day1_items.slice(1); // index 1부터 잘라냄
      return (
        // 첫 장소로 공항 제외할거면 사용
        // <div className="allRoute">
        //   {items.map((item) => (
        //     <PlaceWithBtn item={item} />
        //   ))}
        // </div>
        <div className="allRoute">
          {props.responseData.day1_items.map((item, index) => (
            <PlaceWithBtn key={index} item={item} />
          ))}
        </div>
      );
    } else if (props.selectedDay === 2) {
      return (
        <div className="allRoute">
          {props.responseData.day2_items.map((item, index) => (
            <PlaceWithBtn key={index} item={item} />
          ))}
        </div>
      );
    } else if (props.selectedDay === 3) {
      return (
        <div className="allRoute">
          {props.responseData.day3_items.map((item, index) => (
            <PlaceWithBtn key={index} item={item} />
          ))}
        </div>
      );
    }
  };
  return <div className="Route">{renderRouteContent()}</div>;
}

export default Route;
