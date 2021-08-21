import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

import { useDevice } from "../../app/hooks/use-device";
import AmountInput from "../../components/AmountInput";
import ContentSection from "../../components/ContentSection";
import { selectBalance } from "../../state/userSlice";
import { Pool } from "../../lib";
import { ScaledNumber } from "../../lib/scaled-number";
import DepositButtons from "./DepositButtons";
import PoolStatistics from "./PoolStatistics";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolDeposit = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const availableToDeposit = useSelector(selectBalance(pool.underlying.address));
  const [depositAmount, setDepositAmount] = useState("");
  const { isMobile } = useDevice();

  const inputLabel = isMobile
    ? t("pool.tabs.deposit.input.labelMobile")
    : t("pool.tabs.deposit.input.labelDesktop", { asset: pool.underlying.symbol });

  return (
    <ContentSection
      header={t("pool.tabs.deposit.header", { asset: pool.underlying.symbol })}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            token={pool.underlying}
            value={depositAmount}
            setValue={(v: string) => setDepositAmount(v)}
            label={inputLabel}
            max={availableToDeposit}
          />
          <DepositButtons
            pool={pool}
            value={ScaledNumber.fromUnscaled(depositAmount, pool.underlying.decimals)}
            complete={() => setDepositAmount("")}
          />
        </Content>
      }
    />
  );
};

export default PoolDeposit;
