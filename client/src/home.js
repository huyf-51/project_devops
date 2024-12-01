import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
    const [tickets, setTickets] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get('/api/tickets');
            setTickets(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const ticketList = tickets.map((ticket) => {
        return (
            <tr key={ticket.id}>
                <td>{ticket.title}</td>
                <td>{ticket.price}</td>
                <td>
                    <Link to={`/tickets/${ticket.id}`}>View</Link>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="container">
                <h1>Tickets</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>{ticketList}</tbody>
                </table>
            </div>
        </>
    );
}

export default Home;
