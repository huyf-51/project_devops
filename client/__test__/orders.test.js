import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Order from '../src/pages/orders';

test('test content create ticket page', () => {
    render(<Order />);
    expect(screen.getByRole('heading')).toHaveTextContent('Order List');
});
