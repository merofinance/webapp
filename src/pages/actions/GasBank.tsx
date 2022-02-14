import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectEthPool, selectEthPrice } from "../../state/poolsListSlice";
import Asset from "../../components/Asset";
import Loader from "../../components/Loader";
import { selectGasBankBalance } from "../../state/userSlice";
import { Optional } from "../../lib/types";

const SubHeader = styled.div`
  font-weight: 600;
  letter-spacing: 0.46px;
  opacity: 0.8;
  margin-top: 1rem;

  font-size: 1.5rem;
  margin-bottom: 0.7rem;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 0.5rem;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Underlying = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  margin-bottom: 0.2rem;

  font-size: 1.4rem;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Usd = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.5;

  font-size: 1.2rem;
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Gasbank = (): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const ethPrice = useSelector(selectEthPrice);
  const ethPool = useSelector(selectEthPool);
  const gasBankBalance = useSelector(selectGasBankBalance);

  if (!ethPool || !gasBankBalance || gasBankBalance.isZero()) return null;

  return (
    <>
      <SubHeader>{t("actions.gasBank.header")}</SubHeader>
      <Row>
        <Asset tiny token={ethPool.underlying} />
        <Balances>
          <Underlying>
            {gasBankBalance ? `${gasBankBalance.toCryptoString()} ETH` : <Loader />}
          </Underlying>
          <Usd>{gasBankBalance && ethPrice ? gasBankBalance.toUsdValue(ethPrice) : <Loader />}</Usd>
        </Balances>
      </Row>
    </>
  );
};

export default Gasbank;
