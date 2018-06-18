import "rc-slider/assets/index.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import "react-tagsinput/react-tagsinput.css";
import "react-input-range/lib/css/index.css";
import App from "./App";
import "./styles.css";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
