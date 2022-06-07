import React  from 'react';
import { BOOKING_API } from '../../config/environment';

class ReservationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            phone: '',
            people: '',
            arrivalDate: '',
            arrivalTime: '',
            errors: [],
            response: {},
            createdNew: false,
        };

        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e) {
        const name = e.target.name;
        this.setState({
            [name]: e.target.value
        });

    }

    submitHandler(e) {
        e.preventDefault();

        let errors = [];
        if (this.state.name.trim() === '') {
            errors.push('Name is required.');
        }
        if (this.state.email.trim() === '') {
            errors.push('E-mail is required.');
        }
        if (this.state.phone.trim() === '') {
            errors.push('Phone is required.');
        }
        if (this.state.people.trim() === '' || this.state.people === 0) {
            errors.push('How many people is required.');
        }

        const date = new Date(this.state.arrivalDate + 'T' + this.state.arrivalTime + ':00');
        if (date === "Invalid Date" || (this.state.arrivalDate + 'T' + this.state.arrivalTime + ':00').length < 19) {
            errors.push('Pick a booking date');
        }

        this.setState({
            errors: errors
        });

        if (errors.length === 0) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            const postData = {
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                people: this.state.people,
                arrivalAt: this.state.arrivalDate + 'T' + this.state.arrivalTime + ':00',
            };

            const options = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(postData),
            };

            fetch(BOOKING_API + '/restaurant/629969290ea3b264f4032297/booking/add', options)
                .then((response) => {
                    if(response.ok) {
                        response.json().then((data) => {
                            this.setState({
                                response: data,
                                createdNew: true,
                            });
                        })
                    } else {
                        this.setState({
                            errors: ['Some errors occoured, check the form inputs and try again.']
                        })
                    }
                });
        }
    };

    render() {
        const restaurantOpen = 11;
        const restaurantClose = 23;
        let timesAvailable = [];
        for (let i = restaurantOpen; i <= restaurantClose; i++) {
            timesAvailable.push(i + ':00');
        }
        const today = new Date();
        const minDate = today.toISOString().split('T')[0];

        return (
            <form className="flex flex-col gap-4 mt-4 h-full" onSubmit={this.submitHandler}>
                <div className={'flex flex-col justify-start text-white items-start relative rounded-xl bg-red-900 p-4 ' + (this.state.errors.length >0 ? '' : 'hidden')}>
                    <span>Some errors found to send your request. Please check the errors below and fix to resend.</span>
                    <ul data-testid="error-display" className="list-disc ml-12 mt-6">
                        {this.state.errors.map((error) => (<li key={error}>{error}</li>))}
                    </ul>
                </div>
                <div className={this.state.createdNew ? 'flex flex-col gap-2 justify-center items-center h-full' : 'hidden'}>
                    <h2 className="font-bold text-2xl">Reservation created successfully. Booking ID: #{this.state.response._id?.substr(-8)}</h2>
                    <p>Thank you for making your reservation with us, we are waiting for you.</p>
                </div>
                <div className={this.state.createdNew ? 'hidden' : 'flex flex-col gap-4 mt-4'}>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col gap-1">
                            <label>Date</label>
                            <input
                                data-testid="arrivalDate"
                                name="arrivalDate"
                                min={minDate}
                                className="text-gray-800 py-1 px-2 rounded"
                                type="date"
                                value={this.state.arrivalDate}
                                onChange={this.changeHandler}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Time</label>
                            <select
                                name="arrivalTime"
                                data-testid="arrivalTime"
                                className="text-gray-800 py-2 px-2 rounded"
                                value={this.state.arrivalTime}
                                onChange={this.changeHandler}
                            >
                                <option value="">Choose an option</option>
                                {timesAvailable.map(time => (<option key={time} value={time}>{time}</option>))}
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label>Name</label>
                        <input name="name" data-testid="name" className="text-gray-800 py-1 px-2 rounded" type="text" value={this.state.name}
                               onChange={this.changeHandler}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>E-mail</label>
                        <input name="email" data-testid="email" className="text-gray-800 py-1 px-2 rounded" type="email" value={this.state.email}
                               onChange={this.changeHandler}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>Phone</label>
                        <input name="phone" data-testid="phone" className="text-gray-800 py-1 px-2 rounded" type="text" value={this.state.phone}
                               onChange={this.changeHandler}/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>How many people?</label>
                        <input name="people" data-testid="people" className="text-gray-800 py-1 px-2 rounded" type="number" min="1" value={this.state.people}
                               onChange={this.changeHandler}/>
                    </div>
                    <input type="submit" data-testid="submit-button" value="Submit"
                           className="bg-white cursor-pointer shadow rounded-lg w-1/2 text-blue-800 p-2 font-bold"/>
                </div>
            </form>
        );
    }
}

export default ReservationForm;