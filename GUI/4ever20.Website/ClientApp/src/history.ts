import { createBrowserHistory } from "history";

// Create browser history to use in the Redux store and elsewhere
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

export default history;