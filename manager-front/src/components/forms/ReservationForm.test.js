import { render, screen, act, fireEvent, waitFor } from '@testing-library/react';
import ReservationForm from './ReservationForm';

test('Success render element', () => {
    act(() => {
        render(<ReservationForm method="add" />);
    });
    const linkElement = screen.getAllByText(/Date/i);
    expect(linkElement.length).toBe(1);
});

test('Error add new reservation', () => {
    act(() => {
        render(<ReservationForm method="add" />);
    });

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);

    const error = screen.getByText('Some errors found to send your request. Please check the errors below and fix to resend.');
    expect(error).toBeVisible();

    const errorDisplay = screen.getByTestId('error-display');
    expect(errorDisplay.textContent).toBe("Name is required.E-mail is required.Phone is required.How many people is required.Pick a booking date");
});

test('Success add new reservation', async () => {
    const reservationData = {
        _id: "629969290ea3b264f4031234",
        restaurant : "629969290ea3b264f4032297",
        arrivalDate : "2022-09-08",
        arrivalTime : "15:00",
        name : "Guest Name",
        email : "teste@gmail.com",
        phone : "(99) 99999-9999",
        people : "7",
        __v: "1"
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(reservationData)
    });
    let container;
    act(() => {
        container = render(<ReservationForm method="add" />);
    });

    const nameInput = screen.getByTestId('name');
    fireEvent.change(nameInput, {target: { value: reservationData.name }});

    const emailInput = screen.getByTestId('email');
    fireEvent.change(emailInput, {target: {value: reservationData.email}});

    const phoneInput = screen.getByTestId('phone');
    fireEvent.change(phoneInput, {target: {value: reservationData.phone}});

    const peopleInput = screen.getByTestId('people');
    fireEvent.change(peopleInput, {target: {value: reservationData.people}});

    const arrivalDateInput = screen.getByTestId('arrivalDate');
    fireEvent.change(arrivalDateInput, {target: {value: reservationData.arrivalDate}});

    const arrivalTimeInput = screen.getByTestId('arrivalTime');
    fireEvent.change(arrivalTimeInput, {target: {value: reservationData.arrivalTime}});

    const submitButton = screen.getByTestId('submit-button');

    expect(nameInput.value).toBe(reservationData.name);
    expect(emailInput.value).toBe(reservationData.email);
    expect(phoneInput.value).toBe(reservationData.phone);
    expect(peopleInput.value).toBe(reservationData.people);
    expect(arrivalDateInput.value).toBe(reservationData.arrivalDate);
    expect(arrivalTimeInput.value).toBe(reservationData.arrivalTime);

    fireEvent.click(submitButton);

    const errorDisplay = screen.getByTestId('error-display');
    expect(errorDisplay.textContent).toBe("");

    await waitFor(() => {
        screen.getByText('Reservation created successfully. Booking ID: #f4031234');
    })

    const successDisplay = await screen.getByText('Reservation created successfully. Booking ID: #f4031234');
    expect(successDisplay).toBeInTheDocument();
});

afterEach(() => {
    jest.restoreAllMocks();
});
