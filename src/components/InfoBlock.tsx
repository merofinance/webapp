import styled from "styled-components";
import MeroTooltip, { TooltipItemType } from "./MeroTooltip";

export interface InfoBlockRow {
  label: string;
  tooltip?: string;
  tooltipItems?: TooltipItemType[];
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

  > div:first-child {
    padding-top: 0;
  }

  > div:last-child {
    padding-bottom: 0;
    border: none;
  }
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 0.4rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #494563;
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

  font-size: 1.8rem;
  @media (max-width: 600px) {
    font-size: 1.6rem;
  }

  @media only percy {
    opacity: ${(props: LabelProps) => (props.hideOnSnapshot ? "0" : "1")};
  }
`;

interface Props {
  sections: InfoBlockRow[][];
}

const InfoBlock = ({ sections }: Props): JSX.Element => {
  return (
    <StyledInfoBlock>
      {sections.map((section: InfoBlockRow[], i: number) => (
        <Section key={i}>
          {section.map((row: InfoBlockRow) => (
            <Row key={row.label}>
              <Label>
                {row.label}
                {row.tooltip && <MeroTooltip items={row.tooltipItems}>{row.tooltip}</MeroTooltip>}
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
        </Section>
      ))}
    </StyledInfoBlock>
  );
};

export default InfoBlock;
