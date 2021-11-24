import RegisteredActions from "./RegisteredActions";
import ProtectableLoans from "./lending/ProtectableLoans";

const ActionsIndex = (): JSX.Element => {
  return (
    <>
      <ProtectableLoans />
      <RegisteredActions />
    </>
  );
};

export default ActionsIndex;
