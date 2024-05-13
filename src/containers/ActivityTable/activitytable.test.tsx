import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchActivitiesByTitle } from '../../services/api';
import ActivityTable from './';

jest.mock('../../services/api');

describe('ActivityTable component', () => {
  const mockActivities = [
    {
      id: 1,
      title: 'Activity 1',
      price: 10,
      currency: '$',
      rating: 4,
      specialOffer: false,
    },
    {
      id: 2,
      title: 'Activity 2',
      price: 20,
      currency: '$',
      rating: 5,
      specialOffer: true,
    },
  ];

  beforeEach(() => {
    (fetchActivitiesByTitle as jest.Mock).mockResolvedValue(mockActivities);
  });

  test('renders loading indicator initially', async () => {
    render(<ActivityTable activities={[]} isLoading={true} />);
    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('renders activities in the table after data fetching', async () => {
    render(<ActivityTable activities={mockActivities} isLoading={false} />);
    await waitFor(() => {
      const activity1 = screen.getByText('Activity 1');
      const activity2 = screen.getByText('Activity 2');
      expect(activity1).toBeInTheDocument();
      expect(activity2).toBeInTheDocument();
    });
  });

  test('filters activities based on input value', async () => {
    render(<ActivityTable activities={mockActivities} isLoading={false} />);
    const input = screen.getByPlaceholderText('Filter by title...');
    userEvent.type(input, 'Activity 1');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await waitFor(() => {
      expect(fetchActivitiesByTitle).toHaveBeenCalledWith('Activity 1');
    });
  });
});
