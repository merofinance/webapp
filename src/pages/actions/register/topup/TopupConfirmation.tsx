import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { useBackd } from "../../../../app/hooks/use-backd";
import { AppDispatch } from "../../../../app/store";
import Popup from "../../../../components/Popup";
import { registerPosition } from "../../../../state/positionsSlice";
import { Pool, Position } from "../../../../lib/types";
import { hasPendingTransaction } from "../../../../state/transactionsSlice";
import TopupInformation from "./TopupInformation";

interface Props {
  show: boolean;
  close: () => void;
  position: Position;
  pool: Pool;
  complete: () => void;
}

const TopupConfirmation = ({ show, close, position, pool, complete }: Props): JSX.Element => {
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
  }, [loading]);

  const executeRegister = () => {
    if (!backd || loading) return;
    dispatch(registerPosition({ position, pool, backd }));
  };

  return (
    <Popup
      id="register-topup-confirmation"
      show={show}
      close={close}
      header={t("actions.topup.stages.confirmation.header")}
      confirm
      submit={() => executeRegister()}
      loading={loading}
      content={<TopupInformation position={position} pool={pool} />}
    />
  );
};

export default TopupConfirmation;
