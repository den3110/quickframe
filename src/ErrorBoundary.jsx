import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error('ErrorBoundary caught an error', error, errorInfo);
    if (error.response && error.response.status === 401) {
        // Handle 401 error (e.g., redirect to login page)
        console.log(401);
       
      }
    if(error.response && error.response.status=== 402) {
        console.log(402)
    }
  }

  render() {
    if (this.state.hasError) {
      return <></>
    }

    return this.props.children; 
  }
}

