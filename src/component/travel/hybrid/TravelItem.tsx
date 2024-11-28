
interface ITravelItem {
  date: string;
  index: number;
}
const TravelItem = (props: ITravelItem) => {
  return (
    <button className="w-full p-2">
      <div>Days {props.index}</div>
      <div>
        {props.date}
      </div>
    </button>
  );
};
export default TravelItem;