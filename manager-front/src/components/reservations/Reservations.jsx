import React from 'react';
import { BOOKING_API } from '../../config/environment';
import { ReservationView } from '../';

import './Reservations.css';

class Reservations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reservation: {},
            reservations: [],

            reservationId: '',
            modalContent: (<div/>),
            modalOpen: false,
            modalTitle: 'Reservation',
        };
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        fetch(BOOKING_API + '/restaurant/629969290ea3b264f4032297/booking')
            .then((response) => {
                if(response.ok) {
                    response.json().then((data) => {
                        this.setState({
                            reservations: data
                        });
                    })
                }
            })
    }

    closeModalHandler() {
        this.setState({modalOpen: false, modalContent: (<div/>)})
        this.loadData();
    }

    showReservationModalHandler(reservation) {
        this.setState({
            modalTitle: 'View Reservation #' + reservation._id.substr(-8),
            modalContent: (<ReservationView reservation={reservation} />),
            modalOpen: true,
        })
    }

    render() {

        return (
            <main className="lg:container mx-auto pt-4">
                <div className={'w-full bg-black bg-opacity-90 h-screen absolute top-0 left-0 flex flex-col justify-start pt-6 items-center' + (this.state.modalOpen ? '' : ' hidden')}>
                    <div className="w-2/3 bg-gray-50 text-gray-800 rounded-lg p-6 shadow">
                        <div className="flex flex-row justify-between items-center font-bold text-2xl">
                            <h1>{this.state.modalTitle}</h1>
                            <span className="cursor-pointer" onClick={this.closeModalHandler.bind(this)}>X</span>
                        </div>
                        <main className="mt-6">
                            {this.state.modalContent}
                        </main>
                    </div>
                </div>
                <h1 className="font-bold text-4xl">Reservations</h1>
                <div className={(this.state.reservations.length === 0 ? 'mt-4' : 'hidden')}>
                    No reservations for today or in next days.
                </div>
                <table className={'Home-table' + (this.state.reservations.length === 0 ? ' hidden' : '')}>
                    <thead>
                        <tr>
                            <th>Guest Name</th>
                            <th>Reservation for #people</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.reservations.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.people}</td>
                                    <td>{(new Date(item.arrivalAt)).toLocaleString()}</td>
                                    <td><button onClick={this.showReservationModalHandler.bind(this, item)}>View</button></td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </main>
        )
    }
}

export default Reservations;