import React from "react";
import { Button, Card } from "react-bootstrap";
import { Pool } from "../../lib";

export type PoolProps = {
  pool: Pool;
};

export function PoolCard({ pool }: PoolProps) {
  return (
    <Card>
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}
