import styled from "styled-components";
import BackdTooltip from "./BackdTooltip";

export interface InfoBlockRow {
  label: string;
  tooltip?: string;
  value: string | JSX.Element;
  valueId?: string;
}

const StyledInfoBlock = styled.div`
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(60, 60, 60, 0.5);
  border-radius: 1.4rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 0.6rem 0;
`;

interface LabelProps {
  hideOnSnapshot?: boolean;
}

const Label = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  letter-spacing: 0.15px;
  text-transform: capitalize;

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }

  @media only percy {
    opacity: ${(props: LabelProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

interface Props {
  rows: InfoBlockRow[];
}

const InfoBlock = ({ rows }: Props): JSX.Element => {
  return (
    <StyledInfoBlock>
      {rows.map((row: InfoBlockRow) => (
        <Row key={row.label}>
          <Label>
            {row.label}
            {row.tooltip && <BackdTooltip>{row.tooltip}</BackdTooltip>}
          </Label>
          {typeof row.value === "string" ? (
            <Label id={row.valueId} hideOnSnapshot>
              {row.value}
            </Label>
          ) : (
            row.value
          )}
        </Row>
      ))}
    </StyledInfoBlock>
  );
};

export default InfoBlock;
