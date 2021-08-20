import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import close from "../assets/ui/close.svg";
import { useDevice } from "../app/hooks/use-device";
import Button from "./Button";

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

const ExitEvent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PopupContainer = styled.div`
  position: relative;
  width: 55.4rem;
  padding: 3.7rem 1.6rem 2.3rem 1.6rem;
  border-radius: 1.4rem;
  background-color: #252140;

  @media (max-width: 600px) {
    margin: 0 1rem;
  }
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
  line-height: 4.2rem;
  text-align: center;

  margin-bottom: 2.5rem;
  font-size: 3.6rem;
  @media (max-width: 600px) {
    margin-bottom: 2rem;
    font-size: 2.7rem;
    margin-top: 2rem;
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

type Props = {
  show: boolean;
  close: () => void;
  header?: string;
  content?: JSX.Element;
  confirm?: boolean;
  submit?: () => void;
  loading?: boolean;
};

const Popup = (props: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  if (!props.show) return <></>;

  return (
    <StyledPopup>
      <ExitEvent onClick={props.close} />
      <PopupContainer>
        <Exit src={close} onClick={props.close} alt="exit button" />
        {props.header && <Header>{props.header}</Header>}
        {props.content && props.content}
        {props.confirm && props.submit && (
          <ButtonContainer>
            <Button
              medium
              background="#252140"
              text={isMobile ? t("components.cancelMobile") : t("components.cancelDesktop")}
              click={props.close}
            />
            <Button
              primary
              medium
              text={t("components.confirm")}
              click={() => {
                if (props.submit) props.submit();
              }}
              loading={props.loading}
            />
          </ButtonContainer>
        )}
      </PopupContainer>
    </StyledPopup>
  );
};

export default Popup;
