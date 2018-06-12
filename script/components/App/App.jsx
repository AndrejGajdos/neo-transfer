import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Main from 'views/Main';
import './App.scss';

export class App extends Component {
  state = {
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
  }

  render() {
    return (
      <div className="Site d-flex flex-column">
        <Header />
        <main className="Site-content">
          <ToastContainer position="top-right" autoClose={2250} hideProgressBar />
          {!this.state.error ? (
            <Main />
          ) : (
            <div className="App__error container mt-3">
              <div role="alert" className="alert alert-danger">
                <h4>An error occurred. Please reload the page and try again.</h4>
                <p className="App__stacktrace">
                  {process.env.NODE_ENV === 'development' && this.state.errorInfo.componentStack}
                </p>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
