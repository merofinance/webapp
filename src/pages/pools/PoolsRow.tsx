import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import chevron from "../../assets/ui/chevron.svg";
import Asset from "../../components/Asset";
import Button from "../../components/Button";
import { GradientText } from "../../styles/GradientText";
import { Pool } from "../../lib";
import {
  selectUsersPoolUnderlyingEverywhere,
  selectProtocolPoolUnderlyingEverywhere,
} from "../../state/selectors";
import { selectPrice } from "../../state/poolsListSlice";
import Loader from "../../components/Loader";
import { useDevice } from "../../app/hooks/use-device";

const RowContainer = styled.div`
  width: 100%;
  position: relative;
  margin-top: 0.8rem;
`;

interface RowProps {
  preview?: boolean;
}

const Row = styled.button`
  width: 100%;
  position: relative;
  height: ${(props: RowProps) => (props.preview ? "5.6rem" : "7.2rem")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--row-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  padding: 0 1.7rem;
  cursor: ${(props: RowProps) => (props.preview ? "auto" : "pointer")};

  transition: background-color 0.3s;
  :hover {
    background-color: ${(props: RowProps) => (props.preview ? "var(--row-bg)" : "#1a1438")};
  }

  @media (max-width: 600px) {
    height: 4.8rem;
    padding: 0 1.6rem;

    td:nth-child(1) {
      flex: 1.1;
    }
    td:nth-child(2) {
      flex: 0.9;
    }
  }
`;

interface DataProps {
  right?: boolean;
  preview?: boolean;
  hideOnSnapshot?: boolean;
}

const Data = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  letter-spacing: 0.15px;
  justify-content: ${(props: DataProps) => (props.right ? "flex-end" : "flex-start")};
  display: ${(props: DataProps) => (!props.preview && props.right ? "none" : "flex")};

  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;
  @media (max-width: 600px) {
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 2.1rem;
    display: ${(props: DataProps) => (props.right ? "none" : "flex")};
  }

  @media only percy {
    opacity: ${(props: DataProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

const DepositedData = styled(Data)`
  display: ${(props: DataProps) => (props.preview ? "none" : "flex")};

  @media (max-width: 600px) {
    display: none;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Apy = styled(GradientText)`
  letter-spacing: 0.15px;

  font-weight: 900;
  font-size: 1.6rem;
  line-height: 2rem;
  @media (max-width: 600px) {
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 2.1rem;
  }
`;

interface ChevronProps {
  preview?: boolean;
}

const ChevronData = styled.div`
  width: 2.4rem;

  @media (min-width: 601px) {
    display: ${(props: ChevronProps) => (props.preview ? "none" : "block")};
  }

  @media (max-width: 600px) {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Chevron = styled.img`
  height: 2.4rem;
  width: 2.4rem;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  display: ${(props: RowProps) => (props.preview ? "flex" : "none")};

  right: 1.7rem;
  @media (max-width: 600px) {
    display: none;
    right: 1.6rem;
  }
`;

interface Props {
  pool: Pool;
  preview?: boolean;
}

const PoolsRow = ({ pool, preview }: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isDesktop } = useDevice();

  const price = useSelector(selectPrice(pool));
  const totalDeposits = useSelector(selectProtocolPoolUnderlyingEverywhere(pool));
  const deposits = useSelector(selectUsersPoolUnderlyingEverywhere(pool));

  return (
    <RowContainer>
      <Row
        id={`pool-row-${pool.lpToken.symbol.toLowerCase()}`}
        onClick={() => {
          if (preview && isDesktop) return;
          navigate(`/pool/${pool.lpToken.symbol}`);
        }}
        preview={preview}
      >
        <Data>
          <Asset token={pool.underlying} />
        </Data>
        <Data hideOnSnapshot>
          {pool.apy && pool.apy.toPercent ? (
            <Apy id={`pool-row-${pool.lpToken.symbol.toLowerCase()}-apy`}>
              {pool.apy.toPercent()}
            </Apy>
          ) : (
            <Loader />
          )}
        </Data>
        <Data id={`pool-row-${pool.lpToken.symbol.toLowerCase()}-tvl`} hideOnSnapshot>
          {price && totalDeposits && totalDeposits.toCompactUsdValue ? (
            totalDeposits.toCompactUsdValue(price)
          ) : (
            <Loader />
          )}
        </Data>
        <DepositedData preview={preview}>
          {price && deposits ? deposits.toCompactUsdValue(price) : <Loader />}
        </DepositedData>
        <ChevronData preview={preview}>
          <Chevron src={chevron} alt="right arrow" />
        </ChevronData>
        <Data right preview={preview} />
      </Row>
      <ButtonContainer preview={preview}>
        <Button background="var(--row-bg)" click={() => navigate(`/pool/${pool.lpToken.symbol}`)}>
          {t("pools.deposit")}
        </Button>
      </ButtonContainer>
    </RowContainer>
  );
};

export default PoolsRow;
