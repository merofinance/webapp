import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import closeIcon from "../assets/ui/close.svg";
import { useDevice } from "../app/hooks/use-device";
import Button from "./Button";

interface StyledPopupProps {
  show: boolean;
}

const StyledPopup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  justify-content: center;
  align-items: center;
  background-color: rgba(5, 1, 32, 0.5);
  backdrop-filter: blur(10px);

  display: ${(props: StyledPopupProps) => (props.show ? "flex" : "none")};
`;

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

interface PopupContainerProps {
  small?: boolean;
  centerHeader?: boolean;
}

const PopupContainer = styled.div`
  position: relative;
  width: ${(props: PopupContainerProps) => (props.small ? "31.1rem" : "55.4rem")};
  padding: ${(props: PopupContainerProps) =>
    props.small ? "2.1rem 1.6rem 2.1rem 1.6rem" : "3.7rem 1.6rem 2.3rem 1.6rem"};
  border-radius: 1.4rem;
  background-color: var(--bg-light);
  overflow: hidden;

  @media (max-width: 600px) {
    margin: 0 1rem;
  }
`;

const Exit = styled.img`
  height: 1.4rem;
  position: absolute;
  top: ${(props: PopupContainerProps) => (props.small ? "2.1rem" : "2.9rem")};
  right: ${(props: PopupContainerProps) => (props.small ? "1.6rem" : "2.7rem")};
  cursor: pointer;
`;

const Header = styled.div`
  font-weight: 700;

  text-align: ${(props: PopupContainerProps) => (props.centerHeader ? "center" : "left")};
  margin-bottom: ${(props: PopupContainerProps) => (props.small ? "1.8rem" : "2.5rem")};
  font-size: ${(props: PopupContainerProps) => (props.small ? "1.6rem" : "3.6rem")};
  line-height: ${(props: PopupContainerProps) => (props.small ? "1.7rem" : "4.2rem")};

  @media (max-width: 600px) {
    margin-bottom: 2rem;
    font-size: 2.7rem;
    margin-top: 2rem;
  }
`;

const Body = styled.div`
  width: 100%;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 3rem;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 2.4rem;

  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.7rem;
  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1.8rem;
  }
`;

interface Props {
  show: boolean;
  close: () => void;
  header?: string;
  body?: string;
  content?: JSX.Element;
  confirm?: boolean;
  submit?: () => void;
  loading?: boolean;
  small?: boolean;
  centerHeader?: boolean;
  id?: string;
}

const Popup = ({
  show,
  close,
  header,
  body,
  content,
  confirm,
  submit,
  loading,
  small,
  centerHeader,
  id,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  return (
    <StyledPopup show={show}>
      <ExitEvent onClick={close} />
      <PopupContainer small={small}>
        <Exit
          id={`${id}-popup-exit`}
          src={closeIcon}
          onClick={close}
          alt="exit button"
          small={small}
        />
        {header && (
          <Header id={`${id}-popup-header`} small={small} centerHeader={centerHeader}>
            {header}
          </Header>
        )}
        {body && <Body id={`${id}-popup-body`}>{body}</Body>}
        {content && content}
        {confirm && submit && (
          <ButtonContainer>
            <Button
              id={`${id}-popup-cancel`}
              medium
              background="var(--bg-light)"
              text={isMobile ? t("components.back") : t("components.cancel")}
              click={close}
            />
            <Button
              id={`${id}-popup-button`}
              primary
              medium
              text={t("components.confirm")}
              click={() => {
                if (submit) submit();
              }}
              loading={loading}
            />
          </ButtonContainer>
        )}
      </PopupContainer>
    </StyledPopup>
  );
};

export default Popup;
