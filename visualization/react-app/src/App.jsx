import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import './App.css'

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-semibold text-gray-900">Repository Tree Explorer</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Home
            </Link>
            <Link to="/org-chart" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Org Chart
            </Link>
            <Link to="/eda" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">
              EDA
            </Link>
            <Link to="/explorer" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200">
              Explorer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          {/* Background gradient for visual appeal */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl -z-10"></div>
            
            <div className="relative px-8 py-12">
              
              
              {/* Main title with better hierarchy */}
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Improving AI Retrieval Performance by Augmenting Technical Documentation Metadata
              </h1>
              
              {/* Partnership info with visual separator */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center text-lg">
                  <div className="flex items-center">
                    
                    <span className="font-semibold" style={{color: '#4B9CD3'}}>University of North Carolina</span>
                  </div>
                  <div className="flex items-center">

                    <span className='mx-1'>in Partnership with</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-700">NetApp</span>
                  </div>
                </div>
              </div>
              
              {/* Team info with better styling */}
              <div className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 text-base font-medium rounded-lg mb-10 border border-gray-200">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Master of Applied Data Science • Team 1
              </div>
              
              {/* Enhanced description with better structure */}
              <div className="max-w-5xl mx-auto space-y-4">
                <p className="text-xl text-gray-700 leading-relaxed font-medium">
                  Revolutionizing how organizations access and utilize technical documentation through 
                  advanced natural language processing and machine learning techniques.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our intelligent metadata enrichment system transforms unstructured AsciiDoc content 
                  into searchable, contextually-aware knowledge that accelerates development and support workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2 mb-16">
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">The Challenge</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-start">
              NetApp's extensive library of technical documentation, authored in AsciiDoc and hosted on GitHub, 
              plays a crucial role in product development, customer support, and implementation success. 
              However, the unstructured nature of this content makes it difficult to retrieve relevant 
              information quickly—resulting in slower onboarding, longer troubleshooting times, and 
              inconsistent knowledge sharing.
            </p>
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Our Solution</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-start">
              We address this challenge by developing a metadata enrichment system using natural 
              language processing and machine learning. The focus is on the bluexp-automation repository, 
              analyzing text blocks, headers, code, and tables to extract key entities, topics, semantic 
              relationships, and contextual tags.
            </p>
          </section>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-16">
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Our Approach</h2>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-bold">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Extract Repository Text</h3>
                <p className="text-gray-700">Using Python methods to extract and parse AsciiDoc content from the bluexp-automation repository</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-bold">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Data Preprocessing</h3>
                <p className="text-gray-700">Clean and prepare datasets by removing noise, standardizing formats, and extracting relevant content</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-bold">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Generate Metadata Tags</h3>
                <p className="text-gray-700">Apply BERT-based models to extract key entities, topics, and semantic relationships</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-bold">4</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Build Grading Model</h3>
                <p className="text-gray-700">Develop evaluation framework to assess tag relevance and quality for improved search results</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-lg font-bold">5</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Test & Validate</h3>
                <p className="text-gray-700">Evaluate methodology through user-defined queries and measure search improvement metrics</p>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/explorer" 
                  className="inline-flex items-center px-8 py-4 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl" style={{backgroundColor: '#4B9CD3'}}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explore Repository
            </Link>
            <Link to="/eda" 
                  className="inline-flex items-center px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              View Analytics
            </Link>
            <a href="https://github.com/NetAppDocs/bluexp-automation" 
               className="inline-flex items-center px-8 py-4 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Repository
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

function EDA() {
  const iframeRef = useRef(null)

  useEffect(() => {
    // Load the EDA page in an iframe
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:8000/eda/eda.html'
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm p-4 flex-shrink-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">Exploratory Data Analysis</h1>
          </div>
          <Link to="/" 
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Full-width iframe */}
      <div className="flex-1 w-full">
        <iframe 
          ref={iframeRef}
          className="w-full h-full border-0 block"
          title="EDA Dashboard"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}

function Explorer() {
  const iframeRef = useRef(null)

  useEffect(() => {
    // Load the Explorer page in an iframe
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:8000/explorer/explorer.html'
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm p-4 flex-shrink-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">Repository Explorer</h1>
          </div>
          <Link to="/" 
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Full-width iframe */}
      <div className="flex-1 w-full">
        <iframe 
          ref={iframeRef}
          className="w-full h-full border-0 block"
          title="Repository Explorer"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}

function OrgChart() {
  const iframeRef = useRef(null)

  useEffect(() => {
    // Load the Org Chart page in an iframe
    if (iframeRef.current) {
      iframeRef.current.src = 'http://localhost:8000/org-chart/org-chart.html'
    }
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col bg-white">
      {/* Header bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm p-4 flex-shrink-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h1 className="text-xl font-semibold text-gray-900">Organization Chart</h1>
          </div>
          <Link to="/" 
                className="inline-flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
      
      {/* Full-width iframe */}
      <div className="flex-1 w-full">
        <iframe 
          ref={iframeRef}
          className="w-full h-full border-0 block"
          title="Organization Chart"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/eda" element={<EDA />} />
        <Route path="/explorer" element={<Explorer />} />
        <Route path="/org-chart" element={<OrgChart />} />
      </Routes>
    </Router>
  )
}

export default App