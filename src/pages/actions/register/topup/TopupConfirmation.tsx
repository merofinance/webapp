import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { BigNumber } from "ethers";

import { useBackd } from "../../../../app/hooks/use-backd";
import { AppDispatch } from "../../../../app/store";
import Popup from "../../../../components/Popup";
import { registerPosition } from "../../../../state/positionsSlice";
import { Optional, Pool, Position } from "../../../../lib/types";
import { hasPendingTransaction } from "../../../../state/transactionsSlice";
import TopupInformation from "./TopupInformation";

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  value: Optional<BigNumber>;
  complete: () => void;
}

const TopupConfirmation = ({
  show,
  close,
  position,
  pool,
  value,
  complete,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const backd = useBackd();
  const loading = useSelector(hasPendingTransaction("Register"));
  const [initialised, setInitialised] = useState(false);

  useEffect(() => {
    if (initialised && !loading) {
      complete();
      close();
    }
    setInitialised(true);
    return () => {
      setInitialised(false);
    };
  }, [loading]);

  const executeRegister = () => {
    if (!backd || loading || !value) return;
    dispatch(registerPosition({ position, pool, backd, value }));
  };

  return (
    <Popup
      id="register-topup-confirmation"
      show={show}
      close={close}
      header={t("actions.topup.stages.confirmation.header")}
      submit={() => executeRegister()}
      loading={loading}
    >
      <TopupInformation position={position} pool={pool} value={value} />
    </Popup>
  );
};

export default TopupConfirmation;
