import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/use-request';

export default () => {
    const navigate = useNavigate();
    const { doRequest } = useRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => navigate('/'),
    });

    useEffect(() => {
        doRequest();
    }, []);

    return <div>Signing you out...</div>;
};
