import { useState, useEffect } from 'react';
import ActivityTable from './containers/ActivityTable';
import { fetchActivities } from './services/api';
import { Activity } from './types';

const ActivityList = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await fetchActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return <ActivityTable activities={activities} isLoading={isLoading} />;
};

export default ActivityList;
