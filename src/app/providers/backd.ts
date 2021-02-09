import React from "react";
import { Backd } from "../../lib/backd";
import { Optional } from "../../lib/types";

export const BackdContext = React.createContext<Optional<Backd>>(null);
