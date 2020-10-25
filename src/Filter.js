import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "./axios.js";
import { Link } from "react-router-dom";

const Filter = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    axios.get("/cars").then((res) => {
      setCars(res.data);
    });
  }, []);

  let options = [];

  for (let car of cars) {
    options.push({ value: car.manufacturer, label: car.manufacturer });
  }
  let unique = Array.from(
    new Set(options.map((obj) => JSON.stringify(obj)))
  ).map((obj) => JSON.parse(obj));

  return (
    <div className="filter">
      <>
        <h1>filter</h1>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={unique}
        />

        <Link to="/result">enter </Link>
      </>
    </div>
  );
};

export default Filter;
