import "./MyButton.css"
export const MyButton = ({textToShow,backgroundColor,iconName,myType,myOnClick,}) => {
const style = {
    backgroundColor: backgroundColor?backgroundColor: '#007bff' // צבע כחול ברירת מחדל
};
    return (
        <>
            <button className="myButton" style={style} type={`${myType}`}onClick={myOnClick} >
               {iconName && <i className={iconName}></i>}{" "}{textToShow}
            </button>
        </>
    );
};
