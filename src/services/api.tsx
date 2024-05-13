import { toast } from 'react-toastify';
import { Activity } from '../types';

/**
 * Fetches a list of activities from the API.
 *
 * @returns {Promise<Activity[]>} A Promise that resolves with an array of activities.
 * @throws {Error} If an error occurs during the fetch operation or if the response status is not ok.
 */
export async function fetchActivities(): Promise<Activity[]> {
  try {
    const response = await fetch('http://localhost:3000/api/v1/activities');

    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }

    const data: Activity[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    if (!toast.isActive('fetchError')) {
      toast.error('Error fetching activities', {
        toastId: 'fetchError',
      });
    }
    throw error;
  }
}

/**
 * Fetches activities from the API filtered by title.
 *
 * @param {string} title - The title to filter activities by.
 * @returns {Promise<Activity[]>} A Promise that resolves with an array of activities filtered by title.
 * @throws {Error} If an error occurs during the fetch operation or if the response status is not ok.
 */
export async function fetchActivitiesByTitle(
  title: string
): Promise<Activity[]> {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/activities/search?title=${encodeURIComponent(
        title
      )}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch activities by title');
    }

    const data: Activity[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error filtering activities by title:', error);

    if (!toast.isActive('filterError')) {
      toast.error('Error filtering activities by title', {
        toastId: 'filterError',
      });
    }
    throw error;
  }
}
