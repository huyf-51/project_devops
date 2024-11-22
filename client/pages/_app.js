import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';
import { useEffect, useState } from 'react';

const AppComponent = ({ Component, pageProps, initialCurrentUser }) => {
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);

    useEffect(() => {
        if (!currentUser) {
            const fetchCurrentUser = async () => {
                try {
                    const response = await fetch('/api/users/currentuser');
                    const data = await response.json();
                    setCurrentUser(data.currentUser || null);
                } catch (error) {
                    console.error('Error fetching current user:', error);
                }
            };
            fetchCurrentUser();
        }
    }, [currentUser]);

    return (
        <div>
            <Header currentUser={currentUser} />
            <div className="container">
                <Component currentUser={currentUser} {...pageProps} />
            </div>
        </div>
    );
};

AppComponent.getInitialProps = async (appContext) => {
    const client = buildClient(appContext.ctx);
    let pageProps = {};
    let initialCurrentUser = null;

    try {
        const res = await client.get('/api/users/currentuser');
        initialCurrentUser = res.data.currentUser || null;
    } catch (error) {
        console.log('No current user found');
    }

    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(
            appContext.ctx,
            client,
            initialCurrentUser
        );
    }

    return {
        pageProps,
        initialCurrentUser,
    };
};

export default AppComponent;
