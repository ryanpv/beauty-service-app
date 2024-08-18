import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServiceCategory from '../../templates/service-category';
import { StateProvider } from '../../contexts/state-contexts';


describe('ServiceCategory Component', () => {
  const mockList = [
    {
      id: 1,
      service_name: 'Spa Manicure',
      service_category_name: 'Manicure',
      service_categories_id: 1,
      price: '$20',
      description: 'Lorem ipsum dolor sit amet',
    },
    {
      id: 2,
      service_name: 'Deluxe Spa Manicure',
      service_category_name: 'Manicure',
      service_categories_id: 1,
      price: '$30',
      description: 'Lorem ipsum dolor sit amet',
    },
  ];

  it('should render the services when list is not empty', () => {
    render(
      <BrowserRouter>
        <StateProvider>
          <ServiceCategory list={mockList} serviceCategoryId={1} loading={false} />
        </StateProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Spa Manicure')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Spa Manicure')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();
  });

  it('should render the "List of services currently unavailable" message when list is empty', () => {
    const mockEmptyList: any[] = []
    render(
      <BrowserRouter>
        <StateProvider>
          <ServiceCategory list={mockEmptyList} serviceCategoryId={1} loading={false} />
        </StateProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('List of services currently unavailable.')).toBeInTheDocument();
  });

});