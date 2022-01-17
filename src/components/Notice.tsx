import { useTranslation } from "react-i18next";
import styled from "styled-components";

import icon from "../assets/ui/notice.svg";

const StyledNotice = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.3rem;
  background: rgba(54, 176, 230, 0.1);
  border: 1px solid rgba(100, 182, 247, 1);
  border-radius: 1.65rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 1.4rem;
  margin-right: 1.4rem;
  @media (max-width: 600px) {
    height: 1.1rem;
    margin-right: 0.6rem;
  }
`;

const Text = styled.div`
  font-weight: 500;
  color: #2196f3;
  letter-spacing: 0.15px;

  font-size: 1.6rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

interface Props {
  text: string;
}

const Notice = ({ text }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledNotice>
      <Content>
        <Icon src={icon} alt="Warning icon" />
        <Text>{t(text)}</Text>
      </Content>
    </StyledNotice>
  );
};

export default Notice;
