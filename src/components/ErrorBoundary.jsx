import React from 'react';
import { SYSTEM_VERSION } from '../lib/constants';

// --- Error Boundary ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, errorInfo) { this.setState({ errorInfo }); console.error("CRITICAL ERROR:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, background: '#111', color: '#f55', minHeight: '100vh' }}>
          <h1>⚠️ SYSTEM CRASH ({SYSTEM_VERSION})</h1>
          <pre style={{ background: '#000', padding: 20, whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </pre>
          <button onClick={() => window.location.reload()} style={{ padding: 10, marginTop: 20 }}>RETRY</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
