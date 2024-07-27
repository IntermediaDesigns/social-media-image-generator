// components/AuthCheck.js
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../utils/auth';

export default function AuthCheck({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCurrentUser().then(currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    if (loading) return <div>Loading...</div>;

    if (!user) {
        // Redirect to login page or show login component
        return <div>Please log in</div>;
    }

    return children;
}