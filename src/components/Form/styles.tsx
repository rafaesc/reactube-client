import * as React from "react";
import { StyledFunction } from "styled-components";
import styled, { theme, device } from "../../theme";
// tslint:disable:no-shadowed-variable

interface IDivStyled {
  [x: string]: any;
}
const div: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.div;
const input: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.input;
const form: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.form;
const label: StyledFunction<IDivStyled & React.HTMLProps<HTMLInputElement>> =
  styled.label;

export const InputLabelGeneralStyled = div`
  margin-bottom: 15px;
  input {
    width: 250px;
    padding: 0px 10px;
    border-color: #b9b9b9;
    border: 1px solid #d3d3d3;
    font-size: 13px;
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.05);
    line-height: 24px;
    outline: none;
    :hover,
    :focus {
      border-color: #b9b9b9;
    }
  }
`;

export const FormStyled = form`
${InputLabelGeneralStyled} {
  input {
    margin-left: 200px;
    @media ${device.laptop} {
      margin-left: 45%;
      width: 50%;
    }
  }
}
`;

export const ErrorStyled = div`
color: red;
font-size: 11px;
margin-left: 200px;
margin-top: 5px;
`;

const BubbleStyled = div`
vertical-align: middle;
margin-left: 5px;
display: inline-block;
`;

export const VerifyStyled = styled(BubbleStyled)`
  color: #49d649;
`;

export const LoadingStyled = styled(BubbleStyled)`
  color: #49d649;
`;

export const InputLabelTagStyled = div`
  margin-bottom: 15px;
  .react-tagsinput {
    width: 450px;
    margin-left: 200px;
    @media ${device.laptop} {
      margin-left: 0;
      width: 100%;
    }
    :hover {
      border-color: #b9b9b9;
    }
  }
  .react-tagsinput-tag {
    border: 1px solid ${() => theme.primaryColor};
    color: #ffffff;
    background-color: ${() => theme.primaryColor};
  }
  .react-tagsinput--focused {
    border-color: #b9b9b9;
  }
  .react-tagsinput-remove {
    color: #0d5082;
  }
`;

export const InputStyled = input`
  `;

export const LabelStyled = label`
float: left;
margin-right: 10px;
padding-top: 6px;
font-size: 13px;
line-height: 1.2;
color: #555;
position: absolute;
@media ${device.laptop} {
  max-width: 37%;
}
`;

export const LabelTagsStyled = styled(LabelStyled)`
@media ${device.laptop} {
  display: block;
  position: relative;
  margin-bottom: 10px;
}
`
