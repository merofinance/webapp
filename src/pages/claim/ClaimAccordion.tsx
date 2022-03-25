import { useTranslation } from "react-i18next";
import { ScaledNumber } from "scaled-number";
import styled from "styled-components";

// import { useDevice } from "../../app/hooks/use-device";
import Accordion from "../../components/Accordion";
import AccordionChevron from "../../components/AccordionChevron";
import Loader from "../../components/Loader";
import { BKD_PRICE } from "../../lib/constants";
import { Optional, Pool } from "../../lib/types";
// import Button from "../../components/Button";
import { GradientText } from "../../styles/GradientText";
import ClaimRow from "./ClaimRow";

const Header = styled.div`
  position: relative;
  width: 100%;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;

  height: 6.6rem;
  @media (max-width: 600px) {
    height: 5.6rem;
  }
`;

const HeaderButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const LabelContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  height: 100%;
`;

const Label = styled.div`
  font-weight: 700;
  letter-spacing: 0.25px;
  white-space: nowrap;
  margin-left: 1.7rem;

  font-size: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    font-weight: 400;
  }
`;

const Claimable = styled.div`
  flex: 1;
  font-weight: 700;
  line-height: 2.7rem;
  letter-spacing: 0.15px;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }
`;

const ApyContainer = styled.div`
  flex: 1;
`;

const Apr = styled(GradientText)`
  font-weight: 900;
  font-size: 1.8rem;
  line-height: 2rem;
  letter-spacing: 0.15px;

  @media (max-width: 600px) {
    display: none;
  }
`;

const EndContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  button:first-child {
    margin-right: 1.8rem;
  }

  @media (max-width: 600px) {
    flex: 0.3;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.9rem 0;
`;

const Breakdown = styled.div`
  font-weight: 500;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  opacity: 0.6;
  margin-left: 1.6rem;

  font-size: 1.6rem;
  margin-bottom: 2.4rem;
  @media (max-width: 600px) {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
`;

export interface ClaimRowType {
  pool: Pool;
  claimable: ScaledNumber;
}

interface Props {
  icon: string;
  label: string;
  open: boolean;
  toggle: () => void;
  rows: Optional<ClaimRowType[]>;
  claimable: Optional<ScaledNumber>;
  apy: Optional<ScaledNumber>;
}

const ClaimAccordion = ({
  icon,
  label,
  open,
  toggle,
  rows,
  claimable,
  apy,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  // const { isMobile, isDesktop } = useDevice();

  return (
    <Accordion
      header={
        <Header>
          <HeaderButton onClick={toggle} />
          <LabelContainer>
            <Icon src={icon} alt={`${label} icon`} />
            <Label>{label}</Label>
          </LabelContainer>
          <Claimable>{claimable ? claimable.toUsdValue(BKD_PRICE) : <Loader />}</Claimable>
          <ApyContainer>{apy ? <Apr>{apy.toPercent()}</Apr> : <Loader />}</ApyContainer>
          <EndContainer>
            {/* {isDesktop && (
              <Button background="#1c0c37" width="12rem" small={isMobile} primary={isMobile}>
                {t("claim.buttons.claimAll")}
              </Button>
            )}
            {isDesktop && (
              <Button primary width="18rem">
                {t("claim.buttons.claimAllAndStake")}
              </Button>
            )} */}
            <AccordionChevron open={open} />
          </EndContainer>
        </Header>
      }
      open={open}
    >
      <ContentContainer>
        {rows && rows.length > 0 && <Breakdown>{t("claim.breakdown")}</Breakdown>}
        {rows ? (
          rows.map((row: ClaimRowType, index: number) => (
            <ClaimRow
              key={row.pool.address}
              index={index}
              pool={row.pool}
              claimable={row.claimable}
            />
          ))
        ) : (
          <>
            <Loader row thin />
            <Loader row thin />
          </>
        )}
      </ContentContainer>
    </Accordion>
  );
};

export default ClaimAccordion;
