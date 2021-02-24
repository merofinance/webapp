import React, { useContext, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { BackdContext } from "../../app/providers/backd";
import { AppDispatch } from "../../app/store";
import { EthAddress } from "../../components/eth-address/EthAddress";
import { Pool } from "../../lib";
import { fetchPositions, selectPositions } from "./positionsSlice";

type PositionsProps = {
  pool: Pool;
};

export function Positions({ pool }: PositionsProps) {
  const positions = useSelector(selectPositions(pool));
  const dispatch = useDispatch<AppDispatch>();
  const backd = useContext(BackdContext);

  useEffect(() => {
    if (!backd) return;
    dispatch(fetchPositions(backd, pool));
  }, [backd, dispatch, pool]);

  return (
    <>
      <div className="text-center">
        <h5>Positions</h5>

        <Table>
          <thead>
            <tr>
              <th></th>
              <th>Protocol</th>
              <th>Borrower</th>
              <th>Threshold</th>
              <th>Single topup</th>
              <th>Total topup</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return (
                <tr key={position.key}>
                  <td>{position.protocol}</td>
                  <td>
                    <EthAddress truncate="middle" value={position.account} />
                  </td>
                  <td>{position.threshold}</td>
                  <td>
                    <NumberFormat
                      displayType={"text"}
                      value={position.singleTopUp}
                      thousandSeparator={true}
                      suffix={` ${pool.asset}`}
                    />
                  </td>
                  <td>
                    <NumberFormat
                      displayType={"text"}
                      value={position.totalTopUp}
                      thousandSeparator={true}
                      suffix={` ${pool.asset}`}
                    />
                  </td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}
