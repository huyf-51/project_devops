import { render, screen } from '@testing-library/react';
import NewTicketPage from '../pages/tickets/new';
import '@testing-library/jest-dom';

test('test content create ticket page', () => {
    render(<NewTicketPage />);
    expect(screen.getByRole('heading')).toHaveTextContent('Create a Ticket');
});
