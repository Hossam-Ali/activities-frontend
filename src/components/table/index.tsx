import type { FC } from 'react';
import { Activity } from '../../types';
import './styles.css';

interface TableProps {
  tableHeaders: string[];
  activities: Activity[];
  isDataLoading: boolean;
}

const Table: FC<TableProps> = ({ tableHeaders, activities, isDataLoading }) => {
  /**
   * Renders a cell in the table based on the header and value.
   * If the header is 'price', it prepends the currency symbol to the value.
   * If the header is 'specialOffer', it renders 'Yes' if the value is true, and 'No' otherwise.
   * For other headers, it returns the value as is.
   *
   * @param {string} header - The header of the cell.
   * @param {string | number | boolean} value - The value to render in the cell.
   * @param {Activity} activity - The activity object containing the cell value.
   * @returns {string | React.ReactNode} The rendered content of the cell.
   */
  const renderCell = (
    header: string,
    activity: Activity,
    value: string | number | boolean
  ) => {
    if (header === 'price') {
      return `${activity.currency}${value}`;
    } else if (header === 'rating') {
      return `${value}/5`;
    } else if (header === 'specialOffer') {
      return value ? 'Yes' : 'No';
    }
    return value;
  };

  if (isDataLoading) {
    return (
      <div className="spinner-container" data-testid="loading-indicator">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <table className="table-auto shadow-md w-full">
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header} className="border-0 bg-sky-100 text-blue-950	">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!activities.length && (
          <tr>
            <td colSpan={tableHeaders.length}>
              <div className="flex justify-center pt-5 pb-5">
                <p className="text-blue-950" data-testid="no-data">
                  No data available
                </p>
              </div>
            </td>
          </tr>
        )}
        {activities.map((activity) => (
          <tr key={activity.id} className="hover:bg-sky-50">
            {tableHeaders.map((header) => (
              <td key={header} className="border-0 px-4 text-blue-950	">
                {renderCell(
                  header,
                  activity,
                  activity[header as keyof Activity]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
