import { render, screen } from '@testing-library/react';
import ReservationView from './ReservationView';

test('Check if view render the user data', () => {
    const reservationData = {
        _id : "629e6484276028166409b918",
        restaurant : "629969290ea3b264f4032297",
        arrivalAt : "2022-06-08T15:00:00",
        name : "Michael Mafort",
        email : "michaelmafort@gmail.com",
        phone : "(11) 96375-6296",
        people : 7,
        status : "QUEUED",
        __v : 0
    };
    render(<ReservationView reservation={reservationData} />);
    const linkElement = screen.getAllByText(/Michael Mafort/i);
    expect(linkElement.length).toBe(1);
});
