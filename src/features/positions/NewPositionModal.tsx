import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AssetAmount } from "../../components/asset-amount/AssetAmount";
import { EthAddress } from "../../components/eth-address/EthAddress";
import { Pool, Position } from "../../lib/types";
import { selectPrice } from "../pool/selectors";

type NewPositionModalProps = {
  position: Partial<Position>;
  pool: Pool;
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

export function NewPositionModal({
  position,
  show,
  handleClose,
  pool,
  handleConfirm,
}: NewPositionModalProps) {
  const price = useSelector(selectPrice(pool));

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create position</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        This will open the following position on the&nbsp;
        <b>{position.protocol}</b> protocol:
        <p>
          When the collaterization ratio of &nbsp;
          <EthAddress value={position.account!!} etherscanLink={true} />
          &nbsp;drops below&nbsp;
          <b>{position.threshold}</b>, it will be topped up with&nbsp;
          <b>
            <AssetAmount
              asset={pool.underlying.symbol}
              amount={position.singleTopUp!!}
              price={price}
              parenthesis={true}
              nativeFirst={true}
              smallSecondary={false}
            />
          </b>
          .
          <br />
          This will be repeated each time the collaterization ratio drops, until
          a total of&nbsp;
          <b>
            <AssetAmount
              asset={pool.underlying.symbol}
              amount={position.totalTopUp!!}
              price={price}
              parenthesis={true}
              nativeFirst={true}
              smallSecondary={false}
            />
          </b>
          &nbsp;is topped up.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
