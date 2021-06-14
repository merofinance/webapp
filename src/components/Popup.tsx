import React from "react";
import styled from "styled-components";
import close from "../assets/ui/close.svg";

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(5, 1, 32, 0.5);
  backdrop-filter: blur(10px);
`;

const PopupContainer = styled.div`
  position: relative;
  width: 55.4rem;
  padding: 3.7rem 1.6rem;
  border-radius: 1.4rem;
  background-color: #252140;
`;

const Exit = styled.img`
  height: 2.4rem;
  position: absolute;
  top: 2.4rem;
  right: 2.2rem;
  cursor: pointer;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4.2rem;
  text-align: center;
  margin-bottom: 2.5rem;
`;

type Props = {
  show: boolean;
  close: () => void;
  header?: string;
  content?: JSX.Element;
};

const Popup = (props: Props): JSX.Element => {
  if (!props.show) return <></>;

  return (
    <StyledPopup>
      <PopupContainer>
        <Exit src={close} onClick={props.close} />
        {props.header && <Header>{props.header}</Header>}
        {props.content && props.content}
      </PopupContainer>
    </StyledPopup>
  );
};

export default Popup;
