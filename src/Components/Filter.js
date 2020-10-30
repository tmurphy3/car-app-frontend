import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../axios.js";
import { useHistory } from "react-router-dom";

const Filter = () => {
  const history = useHistory();
  const [manufacturer, setManufacturer] = useState({
    key: "manufacturer",
    value: null,
  });
  const [color, setColor] = useState({ key: "color", value: null });
  const [cars, setCars] = useState([]);
  const filters = [manufacturer, color];

  useEffect(() => {
    axios.get("/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  const handleFilterSubmit = () => {
    let url = "/result";
    filters.map((filter, i) => {
      if (filter.value !== null) {
        if (i === 0) {
          url = url + `?${filter.key}=${filter.value}`;
        } else {
          url = url + `&${filter.key}=${filter.value}`;
        }
      }
    });
    console.log(url);
    console.log(manufacturer);
    let value = manufacturer.value;
    let resultArr = [];
    for (let car of cars) {
      if (car.manufacturer === value) {
        resultArr.push(car.image_url);
      }
    }

    console.log(resultArr);
    history.push("/result", { results: resultArr });
  };

  let options = [];

  for (let car of cars) {
    options.push({
      value: car.manufacturer,
      label: car.manufacturer,
      key: "manufacturer",
    });
  }
  let unique = Array.from(
    new Set(options.map((obj) => JSON.stringify(obj)))
  ).map((obj) => JSON.parse(obj));

  return (
    <div className="filter">
      <>
        <h1>filter</h1>
        <Select
          defaultValue={manufacturer}
          onChange={setManufacturer}
          options={unique}
        />
        <button onClick={handleFilterSubmit}>enter</button>
      </>
    </div>
  );
};

export default Filter;
