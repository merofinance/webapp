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
import PoolStatistics from "./PoolStatistics";
import WithdrawalButton from "./WithdrawButton";

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

type Props = {
  pool: Pool;
};

const PoolWithdraw = ({ pool }: Props): JSX.Element => {
  const { t } = useTranslation();
  const totalBalance = useSelector(selectBalance(pool));
  const staked = useSelector(selectBalance(pool.stakerVaultAddress));
  const availableToWithdraw = totalBalance.sub(staked);
  const { isMobile } = useDevice();

  const [withdrawAmount, setWithdrawAmount] = useState("");

  const inputLabel = isMobile
    ? t("pool.tabs.withdraw.input.labelMobile")
    : t("pool.tabs.withdraw.input.labelDesktop", { asset: pool.underlying.symbol });

  return (
    <ContentSection
      header={t("pool.tabs.withdraw.header", { asset: pool.underlying.symbol })}
      statistics={<PoolStatistics pool={pool} />}
      content={
        <Content>
          <AmountInput
            token={pool.underlying}
            value={withdrawAmount}
            setValue={(v: string) => setWithdrawAmount(v)}
            label={inputLabel}
            max={availableToWithdraw}
          />
          <WithdrawalButton
            pool={pool}
            value={ScaledNumber.fromUnscaled(withdrawAmount, staked.decimals)}
            complete={() => setWithdrawAmount("")}
          />
        </Content>
      }
    />
  );
};

export default PoolWithdraw;
