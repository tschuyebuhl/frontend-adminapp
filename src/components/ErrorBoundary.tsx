import React from 'react';
import ErrorPage from '../pages/ErrorPage';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage?: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Differentiate errors based on error type or message
    let errorMessage = 'An error occurred!';
    if (error.message.includes('404')) {
      errorMessage = 'Page Not Found';
    } else if (error.message.includes('Network Error')) {
      errorMessage = 'Network error. Please check your connection.';
    } // ... you can add more conditions as needed

    return { hasError: true, errorMessage };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI based on the errorMessage
      return <ErrorPage /*message={this.state.errorMessage}*/ />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
