import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./AdvancedSearch.css"; // ייבוא הקובץ CSS
import { MyButton } from "./MyButton";

const Types = { FILTER: "FILTER", BLOCKED: "BLOCKED" };

const DraggableFilter = ({ id, name, canDrag, onRemove, myType }) => {

  if (!myType) {
    console.log("DraggableFilter myType:", myType, "id: ", id, "name: ", name); // הוספת לוג כאן
    //myType = Types.BLOCKED;

  }
  const [{ isDragging }, drag] = useDrag(() => ({
    type: myType?myType:  Types.BLOCKED,
    item: { id },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="filter" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span>{name}</span>
      {onRemove && (
        <button className="remove-button" onClick={onRemove}>
          X
        </button>
      )}
    </div>
  );
};
const DropZone = ({ onDrop, filters ,textToShow}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: Types.FILTER,
    drop: (item) => onDrop(item.id),
    canDrop: (item) => !filters.some((filter) => filter.id === item.id), // בדיקה אם המסנן כבר קיים
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`drop-zone ${isOver ? "hovered" : ""}`}>
      {filters.map((filter) => (
        <DraggableFilter
          key={filter.uniqueId}
          id={filter.id}
          name={filter.name}
          canDrag={false} // לא ניתן לגרור אובייקטים שכבר נמצאים כאן
          onRemove={() => filter.onRemove()} // העברת פונקציית מחיקה
        />
      ))}
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>{textToShow}
      </div>
    </div>
  );
};

const AdvancedSearch = () => {
  const [availableFilters, setAvailableFilters] = useState([
    { id: "מחיר", name: "מחיר", type: Types.FILTER },
    { id: "מיקום", name: "מיקום", type: Types.FILTER },
    { id: "מספר חדרים", name: "מספר חדרים", type: Types.FILTER },
    { id: "תוספים", name: "תוספים", type: Types.BLOCKED },
  ]);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleDrop = (id) => {
    const filterIndex = availableFilters.findIndex((filter) => filter.id === id);

    if (filterIndex !== -1) {
      // יצירת עותק מהמסנן הנוכחי
      const updatedFilter = { ...availableFilters[filterIndex], type: Types.BLOCKED };

      // עדכון רשימת availableFilters עם המסנן המעודכן
      let availableFiltersTemp = [...availableFilters.slice(0, filterIndex), updatedFilter, ...availableFilters.slice(filterIndex + 1)];
      setAvailableFilters(availableFiltersTemp);
      console.log(availableFiltersTemp);
    }

    if (!selectedFilters.some((selected) => selected.id === id)) {
      const filter = availableFilters[filterIndex];
      console.log(availableFilters);
      setSelectedFilters((prev) => [
        ...prev,
        { ...filter, uniqueId: Date.now(), onRemove: () => removeFilter(id) }, // הוספת uniqueId ופונקציית מחיקה
      ]);
    }
  };

  const removeFilter = (id) => {
    setSelectedFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const handleSearch = () => {
    const searchCriteria = selectedFilters.reduce((acc, filter) => {
      acc[filter.id] = true;
      return acc;
    }, {});
    console.log("Search Criteria:", searchCriteria);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <div className="available-filters">
          {availableFilters.map(
            (filter) => (
              !filter.type&&console.log(filter),
              (
                <DraggableFilter
                  key={filter.id}
                  id={filter.id}
                  myType={filter.type}
                  name={filter.name}
                  canDrag={!selectedFilters.some((selected) => selected.id === filter.id)} // הגבלה על גרירה רק אם הוא לא נבחר
                />
              )
            )
          )}
          <div style={{ marginTop: "10px", fontWeight: "bold" }}> מסננים זמינים</div>
        </div>
        <DropZone
          onDrop={handleDrop}
          textToShow={"הכנס פרמטרים לחיפוש"}
          filters={selectedFilters.map((filter) => ({
            ...filter,
            onRemove: () => removeFilter(filter.id), // העברת פונקציית המחיקה
          }))}
        />
      </div>
    
      <MyButton style={{ marginTop: "20px" }} myOnClick={handleSearch} iconName={"df"} textToShow={"לחיפוש"} />
    </DndProvider>
  );
};

export default AdvancedSearch;
