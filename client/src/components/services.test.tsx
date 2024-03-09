import { render, screen, waitFor } from '@testing-library/react';
import Services from './services';
import { StateProvider } from '../contexts/state-contexts';
import { BrowserRouter } from 'react-router-dom';

describe('Services Component', () => {
  const mockFetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue([{ id: 1, name: 'Spa Manicure' }, { id: 2, name: 'Deluxe Spa Manicure' }])
  });

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  it('should render list of services', async () => {
    // Render the component
    render(
      <BrowserRouter>
        <StateProvider>
          <Services />
        </StateProvider>
      </BrowserRouter>
    );

    // Wait for the services to be fetched and rendered
    await waitFor(() => {
      expect(screen.getByText('Spa Manicure')).toBeInTheDocument();
      // expect(screen.getByText('Deluxe Spa Manicure')).toBeInTheDocument();
    });
  });
});