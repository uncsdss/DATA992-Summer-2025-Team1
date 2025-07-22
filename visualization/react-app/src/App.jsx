import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Eda } from './components/Eda.jsx'  
import { Header } from './components/Header.jsx'
import { TreeExplorer } from './components/TreeExplorer.jsx'
import { HomePage } from './components/HomePage.jsx'
import { RepoOrgChart } from './components/RepoOrgChart.jsx'

function App() {
 
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/eda" element={<Eda />} />
          <Route path="/explorer" element={<TreeExplorer />} />
          <Route path="/org-chart" element={<RepoOrgChart />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App