
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './pages/Main';
import HowTo from './pages/HowTo';
import Changelog from './pages/Changelog';
import Dev from './pages/Dev';
import Report from './pages/Report';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/howto" element={<HowTo />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/dev" element={<Dev />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
