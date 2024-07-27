// pages/dashboard.js (and other pages)
import AuthCheck from '../components/AuthCheck';
import PostGenerator from '../components/PostGenerator';
import ScheduledPostsList from '../components/ScheduledPostsList';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

export default function Dashboard() {
    return (
        <AuthCheck>
            <main>
                <h1>Dashboard</h1>
                <PostGenerator />
                <ScheduledPostsList />
                <AnalyticsDashboard />
            </main>
        </AuthCheck>
    );
}