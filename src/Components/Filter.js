import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "../axios.js";
import { useHistory } from "react-router-dom";

const Filter = () => {
  const history = useHistory();
  const [cars, setCars] = useState([]);
  const [manufacturer, setManufacturer] = useState({key: "manufacturer", value: null });
  const [color, setColor] = useState({ key: "paint_color", value: null });
  const [year, setYear] = useState({ key: "year", value: null });
  const [model, setModel] = useState({ key: "model", value: null });
  const [size, setSize] = useState({ key: "size", value: null });
  const [state, setState] = useState({ key: "state", value: null });

  const [cars, setCars] = useState({ key: "state", value: null });
  const [colorOpt, setColorOpt] = useState([]);
  const [yearOpt, setYearOpt] = useState([]);
  const [modelOpt, setModelOpt] = useState([]);
  const [sizeOpt, setSizeOpt] = useState([]);
  const [stateOpt, setStateOpt] = useState([]);
  const [carsOpt, setCarsOpt] = useState([]);
  const [manufacturerOpt, setManufacturerOpt] = useState([]);

  const filters = [manufacturer, color, year, model, size, state];
  let manuOptions = [];
  let yearOptions = [];
  let modelOptions = [];
  let sizeOptions = [];
  let colorOptions = [];
  let stateOptions = [];

  useEffect(() => {
    axios.get("/test").then((res) => setCars(res.data));
    axios.get("/manufacturers").then((res) => setManufacturerOpt(res.data));
    axios.get("/year").then((res) => setYearOpt(res.data));
    axios.get("/model").then((res) => setModelOpt(res.data));
    axios.get("/size").then((res) => setSizeOpt(res.data));
    axios.get("/color").then((res) => setColorOpt(res.data));
    axios.get("/state").then((res) => setStateOpt(res.data));

 
  

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


    history.push(url, { results: cars });
  };

  let newArr = [];
  for (let value of manufacturerOpt) {
    newArr.push({
      value: value,
      label: value,

   
    

      key: "manufacturer",
    });
  }

  return (
    <div className="filter">
      <>
        <h1>filter</h1>
        <Select
          defaultValue={manufacturer}
          onChange={setManufacturer}
          options={newArr}
        />
        <button onClick={handleFilterSubmit}>enter</button>
      </>
    </div>
  );
};

export default Filter;
