import { useState, useEffect } from "react";

import {
  calculateResults,
  getParams,
  getValueMatrix,
} from "../utils/calculateResults";

import {
  CHARACTER_VALUE,
  ENERGY_VALUE,
  HEALTH_VALUE,
  LUCK_VALUE,
  LOGIC_VALUE,
  DUTY_VALUE,
  INTEREST_VALUE,
  WORK_VALUE,
  MEMORY_VALUE,
} from "../utils/constans";

import MatrixResults from "./MatrixResults";
import FaithResults from "./FaithResults";

import { IResults } from "../types";

import "../App.css";

interface IAttributes {
  charahcter: string | null;
  health: string | null;
  luck: string | null;
  energy: string | null;
  logic: string | null;
  duty: string | null;
  interest: string | null;
  work: string | null;
  memory: string | null;
  target: string | null;
  family: string | null;
  habits: string | null;
  temperament: string | null;
  life: string | null;
}

const Matrix = () => {
  const [birthday, setBirthday] = useState<string>("");
  const [results, setResults] = useState<IResults | null>(null);
  const [attributes, setAttributes] = useState<IAttributes>({
    charahcter: null,
    health: null,
    luck: null,
    energy: null,
    logic: null,
    duty: null,
    interest: null,
    work: null,
    memory: null,
    target: null,
    family: null,
    habits: null,
    temperament: null,
    life: null,
  });

  // Вынужденая мера, тк useEffect слал меня nahui
  const computeValues = (birthday: string, results: IResults) => {
    const valueMatrices = {
      charahcter: getValueMatrix(birthday, results, CHARACTER_VALUE),
      health: getValueMatrix(birthday, results, HEALTH_VALUE),
      luck: getValueMatrix(birthday, results, LUCK_VALUE),
      energy: getValueMatrix(birthday, results, ENERGY_VALUE),
      logic: getValueMatrix(birthday, results, LOGIC_VALUE),
      duty: getValueMatrix(birthday, results, DUTY_VALUE),
      interest: getValueMatrix(birthday, results, INTEREST_VALUE),
      work: getValueMatrix(birthday, results, WORK_VALUE),
      memory: getValueMatrix(birthday, results, MEMORY_VALUE),
    };

    const newTarget = getParams(
      valueMatrices.charahcter,
      valueMatrices.health,
      valueMatrices.luck
    );
    const newFamily = getParams(
      valueMatrices.energy,
      valueMatrices.logic,
      valueMatrices.duty
    );
    const newHabits = getParams(
      valueMatrices.interest,
      valueMatrices.work,
      valueMatrices.memory
    );
    const newTemperament = getParams(
      valueMatrices.interest,
      valueMatrices.logic,
      valueMatrices.luck
    );
    const newLife = getParams(
      valueMatrices.health,
      valueMatrices.logic,
      valueMatrices.work
    );

    return {
      ...valueMatrices,
      target: newTarget ?? null,
      family: newFamily ?? null,
      habits: newHabits ?? null,
      temperament: newTemperament ?? null,
      life: newLife ?? null,
    };
  };

  useEffect(() => {
    if (results) {
      const computedValues = computeValues(birthday, results);
      setAttributes(computedValues);
    }
  }, [results, birthday]);

  const handleClear = () => {
    setBirthday("");
    setResults(null);
  };

  const handleCalculate = () => {
    if (birthday) {
      setResults(calculateResults(birthday));
    } else {
      alert("Пожалуйста, введите дату рождения");
    }

    if (results) {
      handleClear();
    }
  };

  const renderFaithResults = () => {
    if (!results) return null;

    return <FaithResults results={results} />;
  };

  const renderTitleResults = () => {
    if (!results) return null;

    return <h2>Результаты:</h2>;
  };

  const renderMatrixResults = () => {
    if (!results) return null;

    return <MatrixResults {...attributes} />;
  };

  return (
    <div className="App">
      <h1>Матрица</h1>
      <label className="wrapper">
        <p>Введите дату рождения:</p>
        <input
          type="date"
          className="input"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </label>
      <button
        onClick={handleCalculate}
        className={results ? "clearButton" : ""}
      >
        {results ? "Очистить" : "Расчитать"}
      </button>
      {renderTitleResults()}
      {renderFaithResults()}
      {renderMatrixResults()}
    </div>
  );
};

export default Matrix;
