/// <reference types="jest" />
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Add Jest DOM types here
declare namespace jest {
  interface Matchers<R> {
    toBeInTheDocument(): R;
    // Add other custom matchers if needed
  }
}
