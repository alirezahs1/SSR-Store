/**
 * Keeps track of the current SSR context.
 * The context is used to pass data from the server to the client.
 */

import { createContext } from "react";

export const SSRContext = createContext();