/**
 * Disclaimer: It is also possible using react-final-form
 * but I wanted to do a demonstration without using a form composition framework
 */

import * as React from "react";
import {
  InputLabel,
  IVideoClip,
  ButtonPrimaryStyled,
  FormStyled
} from "../../components";
import {
  validRequired,
  validImageURL,
  validTime,
  validVideoURL,
  getTime,
  parseFormtoPlaylist
} from "./utils";
import { formatTime } from "../../utils";
import { History } from "history";
import { IForm } from "./type";

interface IProps {
  history: History;
  onSuccess: (playlist: IVideoClip) => void;
  playlist?: IVideoClip;
  onSubmit?: () => void;
}

export default class EditForm extends React.Component<IProps> {
  public state = {
    complete: {},
    errors: {},
    form: {
      endTime: "",
      image: "",
      startTime: "",
      tags: [],
      title: "",
      video: ""
    },
    loading: {},
    submitted: false,
    success: false
  };

  constructor(props: IProps) {
    super(props);

    const playlist: any = props.playlist || {};

    this.state = {
      complete: {},
      errors: {},
      form: {
        endTime: formatTime(playlist.endTime, 3600) || "",
        image: playlist.image || "",
        startTime: formatTime(playlist.startTime, 3600) || "",
        tags: playlist.tags || [],
        title: playlist.title || "",
        video: playlist.src || ""
      },
      loading: {},
      submitted: false,
      success: false
    };
  }

  public handleChange = (property, value) => {
    this.setState(
      {
        form: {
          ...this.state.form,
          [property]: value
        }
      },
      () => {
        if (this.state.submitted) {
          this.validForm();
        }
      }
    );
  };

  public validForm = (successCb?: () => void) => {
    const form: IForm = this.state.form;
    const errors: IForm = {};

    Object.keys(form).forEach(key => {
      const value = form[key];
      if (typeof value === "string") {
        if (!validRequired(value)) {
          errors[key] = "This field is requeried";
        }
      }
    });

    const { startTime, endTime, video, image } = form;

    let startTimeSeconds;
    let endTimeSeconds;

    if (!errors.startTime) {
      if (validTime(startTime)) {
        startTimeSeconds = getTime(startTime);
      } else {
        errors.startTime = "Complete this field correctly";
      }
    }

    if (!errors.endTime) {
      if (validTime(endTime)) {
        endTimeSeconds = getTime(endTime);
      } else {
        errors.endTime = "Complete this field correctly";
      }
    }

    if (
      !errors.startTime &&
      !errors.endTime &&
      startTimeSeconds >= endTimeSeconds
    ) {
      errors.endTime = "The end time must be greater than the start time";
    }

    if (!errors.image) {
      if (!validImageURL(image)) {
        errors.image = "It must be a valid image URL (.jpeg .jpg .gif .png)";
      }
    }

    if (!errors.video) {
      if (!validVideoURL(video)) {
        errors.video = "It must be a valid video URL (.mp4)";
      }
    }

    this.setState(
      {
        errors
      },
      () => {
        if (successCb) {
          successCb();
        }
      }
    );
  };

  public handleSubmit = e => {
    e.preventDefault();

    this.setState({ submitted: true });
    this.validForm(() => {
      const isThereErrors = Object.keys(this.state.errors).length;
      if (!isThereErrors) {
        this.setState({
          success: true
        });
        this.props.onSuccess(parseFormtoPlaylist(this.state.form));
      }
    });
  };

  public handleBack = () => {
    this.props.history.push("/");
  };

  public render() {
    const {
      form: { title, image, endTime, startTime, video, tags },
      loading,
      complete,
      success,
      errors
    } = this.state;
    const playlist = this.props.playlist;
    const errorsForm: any = errors; // Fix typescript
    const loadingForm: any = loading; // Fix typescript
    const completeForm: any = complete; // Fix typescript

    return success ? (
      <div>
        <p>
          {playlist
            ? "The video was updated successfully"
            : "The video was added successfully"}
        </p>
        <ButtonPrimaryStyled onClick={this.handleBack} type="submit">
          Go home
        </ButtonPrimaryStyled>
      </div>
    ) : (
      <FormStyled onSubmit={this.handleSubmit}>
        <InputLabel
          label="Title*"
          value={title}
          error={errorsForm.title}
          onChange={this.handleChange.bind(null, "title")}
        />
        <InputLabel
          label="Image URL*"
          value={image}
          error={errorsForm.image}
          loading={loadingForm.image}
          complete={completeForm.image}
          onChange={this.handleChange.bind(null, "image")}
        />
        <InputLabel
          label="Video URL*"
          value={video}
          error={errorsForm.video}
          loading={loadingForm.video}
          complete={completeForm.video}
          onChange={this.handleChange.bind(null, "video")}
        />
        <InputLabel
          type="time"
          label="Start time (hh:mm:ss)*"
          value={startTime}
          error={errorsForm.startTime}
          onChange={this.handleChange.bind(null, "startTime")}
        />
        <InputLabel
          type="time"
          label="End time (hh:mm:ss)*"
          value={endTime}
          error={errorsForm.endTime}
          onChange={this.handleChange.bind(null, "endTime")}
        />
        <InputLabel
          type="tags"
          label="Tags"
          value={tags}
          error={errorsForm.tags}
          onChange={this.handleChange.bind(null, "tags")}
        />
        <ButtonPrimaryStyled onClick={this.handleSubmit} type="submit">
          {playlist ? "Save in LocalStorage" : "Add in Localstorage"}
        </ButtonPrimaryStyled>
      </FormStyled>
    );
  }
}
