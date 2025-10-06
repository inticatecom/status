/** Represents an endpoint and it's configuration. */
export interface Endpoint {
  /** The absolute base URL of the endpoint (eg. https://example.com). */
  url: Url;
  /** The configuration for the endpoint. */
  config?: Partial<EndpointConfig>;
}

/** Represents an endpoint's configuration and how it is accessed when it's pinged. */
export interface EndpointConfig {
  /** An array of methods that are acceptable to be considered 'online'. */
  okMethods: number[];
  /** The headers to use when pinging the website. */
  headers: Record<string, string>;
}

/** Represents the result of a website's status check. */
export interface State {
  /** Whether or not the website is considered to be 'online'. */
  success: boolean;
  /** The time in milliseconds it took to access the website. */
  latency: number;
  /** A date object representing the last time the website was pinged at. */
  lastPinged: Date;
}

/** Represents an absolute URL. */
export type Url = `${"http" | "https"}://${string}.${string}`;

/** Represents the configuration of the backend and HTTP server. */
export interface Server {
  /** The time it takes to run another ping after the last one. */
  checkInterval: number;
}
