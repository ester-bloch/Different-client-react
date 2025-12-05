import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./AdvancedSearch.css";
import { MyButton } from "./MyButton";
import RangeSlider from "./RangeSlider";
import { getApartmentsByFilter, getCityByName } from "../scripts/api";
import { useDispatch } from "react-redux";
import { ApartmentsOfSearch } from "./ApartmentsOfSearch";
import { setApartmentsFromSearch } from "../Data-Redux/advertiserRedux";

const Types = { FILTER: "FILTER", BLOCKED: "BLOCKED" };

const BooleanDraggableFilter = ({ id, name, canDrag, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Types.FILTER,
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

const NumericDraggableFilter = ({ setSelectedFilters, id, name, canDrag, onRemove, min, max, onRangeChange, currentMin, currentMax }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Types.FILTER,
    item: { id },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="filter" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <RangeSlider
        min={min}
        max={max}
        textToShow={name}
        value={[currentMin, currentMax]}
        style={{ width: "100%" }}
        onChange={(values) => {
          onRangeChange(values);
          setSelectedFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, currentMin: values[0], currentMax: values[1] } : filter)));
        }}
      />
      {onRemove && (
        <button className="remove-button" onClick={onRemove}>
          X
        </button>
      )}
    </div>
  );
};

const TextInputFilter = ({ id, name, canDrag, onRemove, value, onChange }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Types.FILTER,
    item: { id },
    canDrag: canDrag,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="filter" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <input type="text" placeholder={name} value={value} onChange={(e) => onChange(e.target.value)} />
      {onRemove && (
        <button className="remove-button" onClick={onRemove}>
          X
        </button>
      )}
    </div>
  );
};
const SelectFilter = ({ id, name, options, selectedValue, onChange, canDrag, onRemove }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: Types.FILTER,
    item: { id },
    canDrag: true,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} className="filter" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <select value={selectedValue} onChange={(e) => onChange(e.target.value)}>
        <option value="">{`בחר ${name}`}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {onRemove && (
        <button className="remove-button" onClick={onRemove}>
          X
        </button>
      )}
    </div>
  );
};

const DropZone = ({ onDrop, filters, textToShow, setSelectedFilters }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: Types.FILTER,
    drop: (item) => onDrop(item.id),
    canDrop: (item) => !filters.some((filter) => filter.id === item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop} className={`drop-zone ${isOver ? "hovered" : ""}`}>
      {filters.map((filter) => {
        if (filter.type === "NUMERIC") {
          return (
            <NumericDraggableFilter
              setSelectedFilters={setSelectedFilters}
              key={filter.uniqueId}
              id={filter.id}
              name={filter.name}
              canDrag={false}
              onRemove={() => filter.onRemove()}
              min={filter.min}
              max={filter.max}
              onRangeChange={filter.onRangeChange}
            />
          );
        }

        if (filter.type === "TEXT") {
          return (
            <TextInputFilter
              key={filter.uniqueId}
              id={filter.id}
              name={filter.name}
              canDrag={false}
              onRemove={() => filter.onRemove()}
              value={filter.value || ""}
              onChange={filter.onChange}
            />
          );
        }
        if (filter.type === "SELECT") {
          return (
            <SelectFilter
              key={filter.uniqueId}
              id={filter.id}
              name={filter.name}
              options={filter.options}
              selectedValue={filter.selectedValue}
              onChange={filter.onChange}
              canDrag={true}
              onRemove={() => filter.onRemove()}
            />
          );
        }

        return <BooleanDraggableFilter key={filter.uniqueId} id={filter.id} name={filter.name} canDrag={false} onRemove={() => filter.onRemove()} />;
      })}
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>{textToShow}</div>
    </div>
  );
};

const AdvancedSearch = () => {
  const [availableFilters, setAvailableFilters] = useState([
      { id: "מחיר", name: "מחיר", nameInEnglish: "price", type: "NUMERIC", min: 800, max: 1000000 }, 
    // { id: "מיקום", name: "מיקום", type: "BOOLEAN" }, 
      { id: "מספר חדרים", name: "מספר חדרים", nameInEnglish: "numbeds", type: "NUMERIC", min: 1, max: 20 },
      { id: "שם עיר", name: "שם עיר", nameInEnglish: "city", type: "TEXT", value: "", onChange: (newValue) => updateTextFilter("שם עיר", newValue) }, 
    // { id: "שם מפרסם", name: "שם מפרסם", nameInEnglish: "Advertiser", type: "TEXT", value: "", onChange: (newValue) => updateTextFilter("שם מפרסם", newValue) },
    // { id: "סוג נכס",  name: "סוג נכס", type: "SELECT", options: ["דירה", "בית פרטי", "משרד", "חנות"], selectedValue: "", onChange: (newValue) => updateSelectFilter("סוג נכס", newValue), },
  ]);
  const [showAparts, setShowAparts] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const dispatch = useDispatch();

  const handleDrop = (id) => {
    const filterIndex = availableFilters.findIndex((filter) => filter.id === id);

    if (filterIndex !== -1) {
      const updatedFilter = { ...availableFilters[filterIndex], type: Types.BLOCKED };
      let availableFiltersTemp = [...availableFilters.slice(0, filterIndex), updatedFilter, ...availableFilters.slice(filterIndex + 1)];
      setAvailableFilters(availableFiltersTemp);
    }

    if (!selectedFilters.some((selected) => selected.id === id)) {
      const filter = availableFilters[filterIndex];
      setSelectedFilters((prev) => [
        ...prev,
        {
          ...filter,
          uniqueId: Date.now(),
          onRemove: () => removeFilter(id),
          onRangeChange: (newValue) =>{},
          selectedValue: "",
          currentMin: filter.min || 0,
          currentMax: filter.max || 1000000,
        },
      ]);
    }
  };

  const removeFilter = (id) => {
    setSelectedFilters((prev) => prev.filter((filter) => filter.id !== id));
  };

  const updateTextFilter = (id, newValue) => {
    setSelectedFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, value: newValue } : filter)));
  };

  const updateSelectFilter = (id, newValue) => {
    setSelectedFilters((prev) => prev.map((filter) => (filter.id === id ? { ...filter, selectedValue: newValue } : filter)));
  };

  const handleSearch = async () => {
    setShowAparts(false);
    const searchCriteria = { $and: [] };
    for (const filter of selectedFilters) {
      if (filter.type === "NUMERIC") {
        const numericCondition = {};
        if (filter.currentMin !== undefined) {
          numericCondition.$gte = filter.currentMin;
        }
        if (filter.currentMax !== undefined) {
          numericCondition.$lte = filter.currentMax;
        }
        searchCriteria.$and.push({ [filter.nameInEnglish]: numericCondition });
      } else if (filter.type === "TEXT") {
        if (filter.value) {
          if (filter.nameInEnglish === "city") {
            try{
             let data = await getCityByName(filter.value)
             const cityId = data.data._id;
             searchCriteria.$and.push({ [filter.nameInEnglish]: cityId });
            }
            catch(err){
              console.error("Error fetching city data:", err);}
          } else {
            searchCriteria.$and.push({ [filter.nameInEnglish]: filter.value });
          }
        }
      } else if (filter.type === "SELECT") {
        if (filter.selectedValue) {
          searchCriteria.$and.push({ [filter.nameInEnglish]: filter.selectedValue });
        }
      } else if (filter.type === "BOOLEAN") {
        searchCriteria.$and.push({ [filter.nameInEnglish]: true });
      }
    };
    getApartmentsByFilter(searchCriteria)
      .then((data) => {
        dispatch(setApartmentsFromSearch(data.data));
        setShowAparts(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
        <div className="available-filters">
          {availableFilters.map((filter) => {
            if (filter.type === "NUMERIC") {
              return (
                <NumericDraggableFilter
                  setSelectedFilters={setSelectedFilters}
                  key={filter.id}
                  id={filter.id}
                  name={filter.name}
                  canDrag={!selectedFilters.some((selected) => selected.id === filter.id)}
                  min={filter.min}
                  max={filter.max}
                  onRangeChange={(newValue) => {}} 
                />
              );
            }

            if (filter.type === "TEXT") {
              return (
                <TextInputFilter
                  key={filter.id}
                  id={filter.id}
                  name={filter.name}
                  canDrag={!selectedFilters.some((selected) => selected.id === filter.id)}
                  value={filter.value || ""}
                  onChange={(newValue) => updateTextFilter(filter.id, newValue)}
                />
              );
            }
            if (filter.type === "SELECT") {
              return (
                <SelectFilter
                  key={filter.uniqueId}
                  id={filter.id}
                  name={filter.name}
                  options={filter.options}
                  selectedValue={filter.selectedValue}
                  onChange={filter.onChange}
                  canDrag={true} 
                  onRemove={() => filter.onRemove()}
                />
              );
            }
            return (
              <BooleanDraggableFilter
                key={filter.id}
                id={filter.id}
                name={filter.name}
                canDrag={!selectedFilters.some((selected) => selected.id === filter.id)}
                onRemove={() => removeFilter(filter.id)}
              />
            );
          })}
          <div style={{ marginTop: "10px", fontWeight: "bold" }}> מסננים זמינים</div>
        </div>
        <DropZone
          onDrop={handleDrop}
          setSelectedFilters={setSelectedFilters}
          textToShow={"גרור פרמטרים לחיפוש"}
          filters={selectedFilters.map((filter) => ({
            ...filter,
            onRemove: () => removeFilter(filter.id),
          }))}
        />
      </div>
      <MyButton style={{ marginTop: "20px" }} myOnClick={handleSearch} iconName={"df"} textToShow={"לחיפוש"} />
      {showAparts && <ApartmentsOfSearch> </ApartmentsOfSearch>}
    </DndProvider>
  );
};

export default AdvancedSearch;
