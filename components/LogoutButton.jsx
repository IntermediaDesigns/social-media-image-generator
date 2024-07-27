// components/LogoutButton.js
import { logout } from '../utils/auth';
import { useRouter } from 'next/router';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
    };

    return <button onClick={handleLogout}>Log Out</button>;
}