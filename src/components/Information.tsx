import { useState } from "react";
import styled from "styled-components";
import { GradientLink } from "../styles/GradientText";
import InfoCard from "./InfoCard";
import MeroTooltip, { TooltipItemType } from "./MeroTooltip";
import arrow from "../assets/ui/arrow.svg";
import Loader from "./Loader";
import { Optional } from "../lib/types";

interface RowDetailType {
  icon: string;
  label: string;
  link: string;
}

interface InformationRowType {
  label: Optional<string>;
  tooltip: string;
  tooltipItems?: TooltipItemType[];
  value: Optional<string>;
  details?: RowDetailType[];
  description?: string;
}

const InformationRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-top: 1.4rem;
  @media (max-width: 1220px) {
    margin-top: 0.2rem;
  }
`;

interface RowProps {
  isAccordion?: boolean;
  open?: boolean;
}

const InformationHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;

  cursor: ${(props: RowProps) => (props.isAccordion ? "pointer" : "auto")};
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.div`
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;

  font-size: 2rem;
  @media (max-width: 1220px) {
    font-size: 1.4rem;
  }
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Value = styled.div`
  font-weight: 500;
  line-height: 2.8rem;
  letter-spacing: 0.15px;
  color: var(--sub);

  font-size: 2rem;
  @media (max-width: 1220px) {
    font-size: 1.4rem;
  }

  @media only percy {
    opacity: 0;
  }
`;

const Chevron = styled.img`
  margin-left: 0.7rem;
  transition: all 0.3s;

  display: ${(props: RowProps) => (props.isAccordion ? "block" : "none")};
  transform: ${(props: RowProps) => (props.open ? "rotate(0deg)" : "rotate(180deg)")};

  width: 1.1rem;
  @media (max-width: 1220px) {
    width: 1rem;
  }
`;

const AccordionContainer = styled.div`
  width: 100%;
  transition: max-height 0.2s ease-out;
  overflow: hidden;

  max-height: ${(props: RowProps) => (props.open ? "30rem" : "0")};
`;

const AccordionContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.4rem;
`;

const Description = styled.div`
  font-weight: 500;
  letter-spacing: 0.46px;
  opacity: 0.8;
  margin-bottom: 1rem;

  font-size: 1.5rem;
  line-height: 2rem;
  @media (max-width: 1220px) {
    font-size: 1.2rem;
    line-height: 1.7rem;
  }
`;

const AccordionDetailsContent = styled.div`
  width: 100%;
  display: flex;
`;

const DetailItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const DetailIcon = styled.img`
  width: 1.4rem;
`;

const DetailLabel = styled(GradientLink)`
  font-weight: 500;
  line-height: 1.8rem;
  letter-spacing: 0.15px;
  margin-left: 0.7rem;

  font-size: 1.4rem;
  @media (max-width: 1220px) {
    font-size: 1.3rem;
  }
`;

interface Props {
  header: string;
  rows: InformationRowType[];
}

const Information = ({ header, rows }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <InfoCard header={header}>
      {rows.map((row: InformationRowType) => (
        <InformationRow key={row.label}>
          <InformationHeader isAccordion={!!row.details} onClick={() => setOpen(!open)}>
            <LabelContainer>
              <Label>{row.label || <Loader />}</Label>
              <MeroTooltip items={row.tooltipItems}>{row.tooltip}</MeroTooltip>
            </LabelContainer>
            <ValueContainer>
              <Value>{row.value || <Loader />}</Value>
              <Chevron src={arrow} isAccordion={!!row.details} open={open} />
            </ValueContainer>
          </InformationHeader>
          {row.details && (
            <AccordionContainer open={open}>
              <AccordionContent>
                {row.description && <Description>{row.description}</Description>}
                <AccordionDetailsContent>
                  {row.details.map((details: RowDetailType) => (
                    <DetailItem key={details.label}>
                      <DetailIcon src={details.icon} />
                      <DetailLabel href={details.link} target="_blank" rel="noopener noreferrer">
                        {details.label}
                      </DetailLabel>
                    </DetailItem>
                  ))}
                </AccordionDetailsContent>
              </AccordionContent>
            </AccordionContainer>
          )}
        </InformationRow>
      ))}
    </InfoCard>
  );
};

export default Information;
