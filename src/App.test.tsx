import { render, screen } from '@testing-library/react';
import ActivityList from './App';

jest.mock('./services/api'); // Mock the API function

describe('ActivityList component', () => {
  test('renders loading indicator initially', async () => {
    render(<ActivityList />);
    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).toBeInTheDocument();
  });
});
