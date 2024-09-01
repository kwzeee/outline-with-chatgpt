import { SearchIcon } from "outline-icons";
import * as React from "react";
import styled, { useTheme } from "styled-components";
import { s } from "@shared/styles";
import Flex from "~/components/Flex";

type Props = React.HTMLAttributes<HTMLInputElement> & {
  value?: string;
  placeholder?: string;
};

function MessageInput(
  { ...rest }: Props,
  ref: React.RefObject<HTMLInputElement>
) {
  const theme = useTheme();
  const focusInput = React.useCallback(() => {
    ref.current?.focus();
  }, [ref]);

  return (
    <Wrapper align="center">
      <StyledInput {...rest} ref={ref} />
      <StyledIcon size={46} color={theme.placeholder} onClick={focusInput} />
    </Wrapper>
  );
}

const Wrapper = styled(Flex)`
  position: relative;
  margin-bottom: 8px;
  bottom: 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 60px 10px 10px;
  font-size: 30px;
  font-weight: 400;
  outline: none;
  border: 0;
  background: ${s("sidebarBackground")};
  transition: ${s("backgroundTransition")};
  border-radius: 4px;

  color: ${s("text")};

  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    color: ${s("placeholder")};
  }
  :-moz-placeholder {
    color: ${s("placeholder")};
  }
  ::-moz-placeholder {
    color: ${s("placeholder")};
  }
  :-ms-input-placeholder {
    color: ${s("placeholder")};
  }
`;
const StyledIcon = styled(SearchIcon)`
  position: absolute;
  right: 8px;
  opacity: 0.7;
`;

export default React.forwardRef(MessageInput);
