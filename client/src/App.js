import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/signup';
import Signin from './pages/auth/signin';
import Headers from './components/header';
import Home from './home';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Signout from './pages/auth/signout';
import NewTicket from './pages/tickets/new';
import TicketShow from './pages/tickets/[ticketId]';
import Order from './pages/orders';
import OrderShow from './pages/orders/[orderId]';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    const getCurrentUser = async () => {
        try {
            const res = await axios.get('/api/users/currentuser');
            setCurrentUser(res.data?.currentUser);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getCurrentUser();
    }, []);
    return (
        <>
            <BrowserRouter>
                <Headers currentUser={currentUser} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth/signin" element={<Signin />} />
                    <Route path="/auth/signup" element={<Signup />} />
                    <Route path="/tickets/new" element={<NewTicket />} />
                    <Route path="/tickets/:ticketId" element={<TicketShow />} />
                    <Route path="/orders" element={<Order />} />
                    <Route
                        path="/orders/:orderId"
                        element={<OrderShow currentUser={currentUser} />}
                    />
                    <Route path="/auth/signout" element={<Signout />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
