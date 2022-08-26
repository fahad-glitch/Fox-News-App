import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import NewsComponent from './Components/NewsComponent';
import LoadingBar from 'react-top-loading-bar'

const App=()=> {
  const pageSize = 9;
  const apiKey=process.env.REACT_APP_NEWS_APIKEY

  
  const [progress, setProgress] = useState(0);
  

    return (
      <div>
        <Router>
        <LoadingBar
            color='#f11946'
            progress={progress}
          />
        
          <NavBar />
          
          <Routes>
            <Route exact path="/" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="General" />} />
            <Route exact path="/Business" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Business" pageSize={pageSize} country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Entertainment" pageSize={pageSize} country="in" category="Entertainment" />} />
            <Route exact path="/General" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="General" pageSize={pageSize} country="in" category="General" />} />
            <Route exact path="/Health" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Health" pageSize={pageSize} country="in" category="Health" />} />
            <Route exact path="/Science" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Science" pageSize={pageSize} country="in" category="Science" />} />
            <Route exact path="/Sports" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Sports" pageSize={pageSize} country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<NewsComponent setProgress={setProgress} apiKey={apiKey} key="Technology" pageSize={pageSize} country="in" category="Technology" />} />
          </Routes>
          
        </Router>
        
      </div>
    );
}

export default App;

