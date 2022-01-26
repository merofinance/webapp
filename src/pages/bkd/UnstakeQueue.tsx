import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDevice } from "../../app/hooks/use-device";
import Button from "../../components/Button";

const StyledUnstakeQueue = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  padding-top: 3.5rem;
  @media (max-width: 600px) {
    padding-top: 2rem;
  }
`;

const Header = styled.div`
  font-weight: 700;
  margin-bottom: 1.5rem;
  letter-spacing: 0.15px;

  font-size: 2rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const Headers = styled.div`
  width: 100%;
  display: flex;
  opacity: 0.6;
  margin-bottom: 0.5rem;
`;

const HeaderText = styled.div`
  flex: 1;
  font-weight: 700;
  letter-spacing: 0.15px;

  font-size: 1.2rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  border-top: 1px solid #162a55;

  > div:last-child {
    justify-content: flex-end;
  }

  height: 5rem;
  @media (max-width: 600px) {
    height: 4rem;
  }
`;

const RowItem = styled.div`
  flex: 1;
  font-weight: 600;
  letter-spacing: 0.21px;
  display: flex;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
`;

const UnstakeQueue = (): JSX.Element => {
  const { t } = useTranslation();
  const { isMobile } = useDevice();

  return (
    <StyledUnstakeQueue>
      <Header>{t("bkd.unstake.queue.header")}</Header>
      <Headers>
        <HeaderText>{t("bkd.unstake.queue.headers.amount")}</HeaderText>
        <HeaderText>{t("bkd.unstake.queue.headers.remaining")}</HeaderText>
        <HeaderText />
      </Headers>
      <Row>
        <RowItem>300 BKD</RowItem>
        <RowItem>30d 12h 23m</RowItem>
        <RowItem>
          <Button
            primary
            small
            disabled
            hoverText={t("bkd.unstake.queue.pending")}
            click={() => console.log("todo")}
          >
            {isMobile ? t("bkd.unstake.queue.claimMobile") : t("bkd.unstake.queue.claim")}
          </Button>
        </RowItem>
      </Row>
      <Row>
        <RowItem>1,345 BKD</RowItem>
        <RowItem>-</RowItem>
        <RowItem>
          <Button primary small click={() => console.log("todo")}>
            {isMobile ? t("bkd.unstake.queue.claimMobile") : t("bkd.unstake.queue.claim")}
          </Button>
        </RowItem>
      </Row>
    </StyledUnstakeQueue>
  );
};

export default UnstakeQueue;
