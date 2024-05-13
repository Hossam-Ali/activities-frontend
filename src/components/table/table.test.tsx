import { render, screen } from '@testing-library/react';
import Table from './';

describe('Table component', () => {
  const tableHeaders = [
    'id',
    'title',
    'price',
    'currency',
    'rating',
    'specialOffer',
  ];
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

  test('renders loading indicator initially', async () => {
    render(
      <Table tableHeaders={tableHeaders} activities={[]} isDataLoading={true} />
    );
    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('renders no data message if activities array is empty', async () => {
    render(
      <Table
        tableHeaders={tableHeaders}
        activities={[]}
        isDataLoading={false}
      />
    );
    const noDataMessage = screen.getByTestId('no-data');
    expect(noDataMessage).toBeInTheDocument();
  });

  test('renders activities in the table after data fetching', async () => {
    render(
      <Table
        tableHeaders={tableHeaders}
        activities={mockActivities}
        isDataLoading={false}
      />
    );

    const activity1 = screen.getByText('Activity 1');
    const activity2 = screen.getByText('Activity 2');
    const price1 = screen.getByText('$10');
    const price2 = screen.getByText('$20');
    const rating1 = screen.getByText('4/5');
    const rating2 = screen.getByText('5/5');
    const specialOffer1 = screen.getByText('No');
    const specialOffer2 = screen.getByText('Yes');

    expect(activity1).toBeInTheDocument();
    expect(activity2).toBeInTheDocument();
    expect(price1).toBeInTheDocument();
    expect(price2).toBeInTheDocument();
    expect(rating1).toBeInTheDocument();
    expect(rating2).toBeInTheDocument();
    expect(specialOffer1).toBeInTheDocument();
    expect(specialOffer2).toBeInTheDocument();
  });
});
