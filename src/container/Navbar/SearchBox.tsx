import * as React from "react";
import { History } from "history";
import { InputLabel } from "../../components";
import {
  SearchBoxButtonStyled,
  SearchBoxStyled,
  SearchBoxFormStyled
} from "./styles";

interface IProps {
  history: History;
}

class SearchBox extends React.Component<IProps> {
  public state = {
    value: ""
  };

  public handleChange = value => {
    this.setState({ value });
  };

  public handleSubmit = e => {
    const { value } = this.state;
    const cleanValue = value.trim()
    if (cleanValue === "") {
      this.props.history.push("/");
    } else {
      this.props.history.push("/search/" + cleanValue);
    }
    e.preventDefault();
  };

  public render() {
    return (
      <SearchBoxStyled>
        <SearchBoxFormStyled onSubmit={this.handleSubmit}>
          <InputLabel
            placeholder="Search"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <SearchBoxButtonStyled type="submit">
            <i className="fas fa-search" />
          </SearchBoxButtonStyled>
        </SearchBoxFormStyled>
      </SearchBoxStyled>
    );
  }
}

export default SearchBox;
