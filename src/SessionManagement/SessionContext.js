import React from "react";
import {getSessionCookie} from "./CookiesService";

export const SessionContext = React.createContext(getSessionCookie());