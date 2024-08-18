import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ServiceCategory from '../../templates/service-category';
import { StateProvider } from '../../contexts/state-contexts';

const renderServiceCategory = (listState: any[]) => {
  render(
    <BrowserRouter>
      <StateProvider>
        <ServiceCategory list={listState} serviceCategoryId={1} loading={false} />
      </StateProvider>
    </BrowserRouter>
  )
}; 


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
    renderServiceCategory(mockList);

    expect(screen.getByText('Spa Manicure')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('Deluxe Spa Manicure')).toBeInTheDocument();
    expect(screen.getByText('$30')).toBeInTheDocument();
  });

  it('should render the "List of services currently unavailable" message when list is empty', () => {
    const mockEmptyList: any[] = []
    renderServiceCategory(mockEmptyList);

    expect(screen.getByText('List of services currently unavailable.')).toBeInTheDocument();
  });

});