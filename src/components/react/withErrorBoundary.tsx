import React from 'react';
import type { ComponentType } from 'react';
import ErrorBoundary from './ErrorBoundary';

export default function withErrorBoundary<P extends object>(
  Component: ComponentType<P>,
  name?: string
) {
  function Wrapped(props: P) {
    return (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    );
  }
  Wrapped.displayName = `WithErrorBoundary(${name ?? Component.displayName ?? Component.name ?? 'Component'})`;
  return Wrapped;
}
