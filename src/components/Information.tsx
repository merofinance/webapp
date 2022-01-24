import { useState } from "react";
import styled from "styled-components";
import { GradientLink } from "../styles/GradientText";
import InfoCard from "./InfoCard";
import Tooltip, { TooltipItemType } from "./Tooltip";
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
  value: Optional<string>;
  tooltipItems?: TooltipItemType[];
  details?: RowDetailType[];
}

const StyledInformation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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

  max-height: ${(props: RowProps) => (props.open ? "4rem" : "0")};
`;

const AccordionContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 1.4rem;
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

type Props = {
  header: string;
  rows: InformationRowType[];
};

const Information = ({ header, rows }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <InfoCard
      header={header}
      content={
        <StyledInformation>
          {rows.map((row: InformationRowType) => (
            <InformationRow key={row.label}>
              <InformationHeader isAccordion={!!row.details} onClick={() => setOpen(!open)}>
                <LabelContainer>
                  <Label>{row.label || <Loader />}</Label>
                  <Tooltip content={row.tooltip} items={row.tooltipItems} />
                </LabelContainer>
                <ValueContainer>
                  <Value>{row.value || <Loader />}</Value>
                  <Chevron src={arrow} isAccordion={!!row.details} open={open} />
                </ValueContainer>
              </InformationHeader>
              {row.details && (
                <AccordionContainer open={open}>
                  <AccordionContent>
                    {row.details.map((details: RowDetailType) => (
                      <DetailItem>
                        <DetailIcon src={details.icon} />
                        <DetailLabel href={details.link} target="_blank" rel="noopener noreferrer">
                          {details.label}
                        </DetailLabel>
                      </DetailItem>
                    ))}
                  </AccordionContent>
                </AccordionContainer>
              )}
            </InformationRow>
          ))}
        </StyledInformation>
      }
    />
  );
};

export default Information;
