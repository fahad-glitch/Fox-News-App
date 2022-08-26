import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './Components/NavBar';
import NewsComponent from './Components/NewsComponent';
import LoadingBar from 'react-top-loading-bar'

class App extends Component {
  pageSize = 9;
  apiKey=process.env.REACT_APP_NEWS_APIKEY

  state={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({
      progress:progress
    })
  }
  render() {  

    return (
      <div>
        <Router>
        <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
        
          <NavBar />
          
          <Routes>
            <Route exact path="/" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} pageSize={this.pageSize} country="in" category="General" />} />
            <Route exact path="/Business" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Business" pageSize={this.pageSize} country="in" category="Business" />} />
            <Route exact path="/Entertainment" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Entertainment" pageSize={this.pageSize} country="in" category="Entertainment" />} />
            <Route exact path="/General" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="General" pageSize={this.pageSize} country="in" category="General" />} />
            <Route exact path="/Health" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Health" pageSize={this.pageSize} country="in" category="Health" />} />
            <Route exact path="/Science" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Science" pageSize={this.pageSize} country="in" category="Science" />} />
            <Route exact path="/Sports" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Sports" pageSize={this.pageSize} country="in" category="Sports" />} />
            <Route exact path="/Technology" element={<NewsComponent setProgress={this.setProgress} apiKey={this.apiKey} key="Technology" pageSize={this.pageSize} country="in" category="Technology" />} />
          </Routes>
          
        </Router>
        
      </div>
    );
  }
}

export default App;

