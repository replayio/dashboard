import { MockGraphQLData } from "tests/mocks/types";

// In a NextJS/React app, data is passed to the server via a request (path name, query parameters, and headers)
// It is passed from the server to the client via React props and can be shared via React context
// After a page navigation, components that were not re-rendered will still contain the previous values from the server
// However the server will process a new request and so it will no longer have access to the previous request's values
// This presents a challenge for state that want to follow the user as they navigate
// Specifically the mock GraphQL response values that may be passed by an end-to-end test
// In order for server-side methods like getServerSideProps() to access that data, we need to store it somewhere on the server

let mockGraphQLData: MockGraphQLData | null = null;

export function getMockGraphQLData(): MockGraphQLData | null {
  return mockGraphQLData;
}

export function setMockGraphQLData(value: MockGraphQLData | null) {
  mockGraphQLData = value;
}
