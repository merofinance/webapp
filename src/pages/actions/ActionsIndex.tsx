import RegisteredActions from "./RegisteredActions";
import ProtectableLoans from "./ProtectableLoans";

const ActionsIndex = (): JSX.Element => {
  return (
    <>
      <ProtectableLoans />
      <RegisteredActions />
    </>
  );
};

export default ActionsIndex;
