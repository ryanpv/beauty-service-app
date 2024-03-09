import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../../App';
import { BrowserRouter } from 'react-router-dom';
import { StateProvider } from '../../contexts/state-contexts';

// test('renders learn react link', () => {
//   render(    <BrowserRouter>
//     <StateProvider>
//       <App />
//     </StateProvider>
//   </BrowserRouter>);
//   const linkElement = screen.getByText(/PolishByCin/i);
//   expect(linkElement).toBeInTheDocument();
// });
