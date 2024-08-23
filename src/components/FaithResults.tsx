import { IResults } from "../types";

interface IFaithResults {
  results: IResults;
}

const FaithResults: React.FC<IFaithResults> = ({ results }) => {
  const { sum1, sum2, sum3, sum4, destinyNumber } = results;

  const arrayResults = [sum1, sum2, sum3, sum4];

  const arrTh = ["Доп числа", "Число судьбы"];

  const joinResults = arrayResults.join(", ");

  const arrTd = [joinResults, destinyNumber];

  const renderTh = () => arrTh.map((th, i) => <th key={i}>{th}</th>);

  const renderTd = () => arrTd.map((td, i) => <td key={i}>{td}</td>);

  return (
    <div className="results">
      <table>
        <thead>
          <tr>{renderTh()}</tr>
        </thead>
        <tbody>
          <tr>{renderTd()}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default FaithResults;
