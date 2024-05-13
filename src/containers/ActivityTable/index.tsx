import { type FC, useState, useEffect } from 'react';
import { fetchActivitiesByTitle } from '../../services/api';
import { Activity } from '../../types';
import Table from '../../components/table';
import useDebounce from '../../utils/useDebounce';
import SearchIcon from '../../assets/icons/search';
import './styles.css';

interface ActivityTableProps {
  activities: Activity[];
  isLoading: boolean;
}

const ActivityTable: FC<ActivityTableProps> = ({ activities, isLoading }) => {
  const [filterValue, setFilterValue] = useState('');
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const debouncedFilterValue = useDebounce(filterValue, 1000);

  useEffect(() => {
    const tableHeaders = Object.keys(activities[0] || {}).filter(
      (header) => !['currency', 'supplierId', 'id'].includes(header)
    );

    setTableHeaders(tableHeaders);
    setFilteredActivities(activities);
  }, [activities]);

  useEffect(() => {
    const fetchActivities = async (debouncedFilterValue: string) => {
      try {
        const activities = await fetchActivitiesByTitle(debouncedFilterValue);
        setFilteredActivities(activities);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };
    if (debouncedFilterValue) {
      fetchActivities(debouncedFilterValue);
    } else {
      setFilteredActivities(activities);
    }
  }, [filterValue, debouncedFilterValue, activities]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="input-container px-5 mt-5">
      <div className="flex">
        <input
          className="input-field text-blue-950 shadow-md rounded-md relative"
          type="text"
          placeholder="Filter by title..."
          value={filterValue}
          onChange={handleFilterChange}
        />
        <SearchIcon classes="absolute right-10 top-3" />
      </div>
      <Table
        tableHeaders={tableHeaders}
        activities={filteredActivities}
        isDataLoading={isLoading}
      />
    </div>
  );
};

export default ActivityTable;
