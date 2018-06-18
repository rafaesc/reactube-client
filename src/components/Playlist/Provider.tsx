import * as React from "react";

const Context = React.createContext({});

interface IState {
  random?: boolean;
}

export interface IPlaylistProvider extends IState {}

export default class PlaylistProvider extends React.Component<any, IState> {
  public static Consumer = Context.Consumer;

  public state = {
    random: false
  };

  public render() {
    const value: IPlaylistProvider = this.state;

    return <Context.Provider value={value} {...this.props} />;
  }
}
