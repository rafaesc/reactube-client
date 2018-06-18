import * as React from "react";
import MaskedInput from "react-text-mask";

export default props => (
  <MaskedInput
    {...props}
    mask={[/\d/, /\d/, ":", /\d/, /\d/, ":", /\d/, /\d/]}
  />
);
