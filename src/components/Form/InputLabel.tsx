import * as React from "react";
import TagsInput from "react-tagsinput";
import InputTime from "./InputTime";
import {
  InputStyled,
  LabelStyled,
  InputLabelGeneralStyled,
  InputLabelTagStyled,
  ErrorStyled,
  VerifyStyled,
  LoadingStyled,
  LabelTagsStyled
} from "./styles";

interface IProps {
  value: any;
  error?: string;
  loading?: boolean;
  complete?: boolean;
  type?: string;
  label?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const InputLabel: React.SFC<IProps> = props => {
  const type = props.type || "text";

  const handleChange = event => {
    if (type === "tags") {
      const tags = event;
      let formatTags: any = [];
      tags.forEach((tag: string) => {
        if (tag.indexOf(",") > -1) {
          formatTags = formatTags.concat(
            tag.split(",").map(item => item.trim())
          );
        } else {
          formatTags.push(tag);
        }
      });
      props.onChange(formatTags);
    } else {
      props.onChange(event.target.value);
    }
  };

  return type === "tags" ? (
    <InputLabelTagStyled>
      <LabelTagsStyled>{props.label}</LabelTagsStyled>
      <TagsInput value={props.value} addOnBlur={true} onChange={handleChange} />
    </InputLabelTagStyled>
  ) : (
    <InputLabelGeneralStyled>
      {props.label && <LabelStyled>{props.label}</LabelStyled>}
      {type === "time" ? (
        <InputTime
          value={props.value}
          onChange={handleChange}
          placeholder={props.placeholder}
        />
      ) : (
        <InputStyled
          value={props.value}
          onChange={handleChange}
          placeholder={props.placeholder}
        />
      )}
      {props.error && <ErrorStyled>{props.error}</ErrorStyled>}
      {props.loading && (
        <LoadingStyled>
          <i className="fas fa-spinner fa-spin" />
        </LoadingStyled>
      )}
      {props.complete && (
        <VerifyStyled>
          <i className="fas fa-check-circle" />
        </VerifyStyled>
      )}
    </InputLabelGeneralStyled>
  );
};

export default InputLabel;
