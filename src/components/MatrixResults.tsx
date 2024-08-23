import { ICell } from "../types";

interface IMatrixResults {
  temperament: string | null;
  charahcter: string | null;
  health: string | null;
  luck: string | null;
  target: string | null;
  energy: string | null;
  logic: string | null;
  duty: string | null;
  family: string | null;
  interest: string | null;
  work: string | null;
  memory: string | null;
  habits: string | null;
  life: string | null;
}

const renderCell = (cell: ICell, cellIndex: number, rowIndex: number) => (
  <td key={`${rowIndex}-${cellIndex}`}>
    <div className="cell-content">
      <div>{cell.label}</div>
      <div>{cell.value}</div>
    </div>
  </td>
);

const MatrixResults: React.FC<IMatrixResults> = ({
  temperament,
  charahcter,
  health,
  luck,
  target,
  energy,
  logic,
  duty,
  family,
  interest,
  work,
  memory,
  habits,
  life,
}) => {
  const tableData = [
    [{ label: "Темперамент", value: temperament }],
    [
      { label: "Характер", value: charahcter },
      { label: "Здоровье", value: health },
      { label: "Удача", value: luck },
      { label: "Цель", value: target },
    ],
    [
      { label: "Энергия", value: energy },
      { label: "Логика", value: logic },
      { label: "Долг", value: duty },
      { label: "Семья", value: family },
    ],
    [
      { label: "Интерес", value: interest },
      { label: "Труд", value: work },
      { label: "Память", value: memory },
      { label: "Привычки", value: habits },
    ],
    [{ label: "Быт", value: life }],
  ];

  return (
    <div className="results">
      <table>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) =>
                renderCell(cell as ICell, cellIndex, rowIndex)
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatrixResults;
