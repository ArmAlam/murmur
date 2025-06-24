import { Routes, Route, Link } from 'react-router-dom';
import TimelinePage from './TimelinePage';
import OwnUserPage from './OwnUserPage';
import OtherUserPage from './OtherUserPage';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      <nav style={{ marginBottom: '30px' }}>
        <Link to="/" style={{ marginRight: '20px' }}>Timeline</Link>
        <Link to="/me">My Profile</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/me" element={<OwnUserPage />} />
        <Route path="/users/:id" element={<OtherUserPage />} />
      </Routes>
    </div>
  );
}
