import "./MyButton.css"
export const MyButton = ({textToShow,backgroundColor,iconName,myType,myOnClick,}) => {

    return (
        <>
            <button className="myButton" type={`${myType}`}style={{ backgroundColor }}onClick={myOnClick} >
               {iconName && <i className={iconName}></i>}{textToShow}
            </button>
        </>
    );
};
