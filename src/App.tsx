import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PdfEditor from './components/PdfEditor';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <PdfEditor />
      </main>
      <Footer />
    </div>
  );
}

export default App;