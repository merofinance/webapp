import React from "react";
import { Button, Modal } from "react-bootstrap";
import { EthAddress } from "../../components/eth-address/EthAddress";
import { Position } from "../../lib/types";

type ConfirmRemovePositionModalProps = {
  position: Position;
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
};

export function ConfirmRemovePositionModal({
  position,
  show,
  handleClose,
  handleConfirm,
}: ConfirmRemovePositionModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create position</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to remove position for{" "}
          <EthAddress value={position.account} etherscanLink={true} /> on {position.protocol}?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
