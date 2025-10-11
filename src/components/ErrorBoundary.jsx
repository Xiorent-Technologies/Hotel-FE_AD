import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center p-6 bg-red-50 rounded-lg">
          <h2 className="text-red-600 font-semibold text-lg mb-2">
            Something went wrong.
          </h2>
          <p className="text-gray-600 text-sm">
            Please refresh or try again later.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;