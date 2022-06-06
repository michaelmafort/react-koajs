import React from 'react';

function ReservatioinView(props) {
    return (
        <nav className="text-gray-50 flex flex-col text-gray-900 p-4 gap-2">
            <p><strong>Guest Name:</strong> <span>{props.reservation.name}</span></p>
            <p><strong>E-mail:</strong> {props.reservation.email}</p>
            <p><strong>Phone:</strong> {props.reservation.phone}</p>
            <p><strong>Status:</strong> {props.reservation.status}</p>
            <p><strong>Reservation for:</strong> {props.reservation.people} people</p>
        </nav>
    );
}

export default ReservatioinView;