import styled from "styled-components";
import failure from "../assets/ui/status/failure.svg";
import pending from "../assets/ui/status/pending.svg";
import success from "../assets/ui/status/success.svg";
import { spinAnimation } from "../styles/animations/SpinAnimation";
import { Optional } from "../lib/types";

interface StatusProps {
  pending: boolean;
  large?: boolean;
}

const StyledStatus = styled.img`
  height: ${({ large }): string => (large ? "1.8rem" : "1.4rem")};
  animation: ${(props: StatusProps) => (props.pending ? spinAnimation : "none")} 1s linear infinite;
`;

export enum StatusType {
  PENDING = "pending",
  SUCCESS = "success",
  FAILURE = "failure",
  EMPTY = "empty",
}

interface Props {
  status: StatusType;
  large?: boolean;
}

const Status = ({ status, large }: Props): Optional<JSX.Element> => {
  const icon = () => {
    switch (status) {
      case StatusType.PENDING:
        return pending;
      case StatusType.SUCCESS:
        return success;
      default:
        return failure;
    }
  };

  if (status === StatusType.EMPTY) return null;

  return <StyledStatus large={large} src={icon()} pending={status === StatusType.PENDING} />;
};

export default Status;
