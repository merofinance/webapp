import { useState } from "react";

type ActionInfo = { status: string; actionType: string };
type UseLoadingProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  handleTxDispatch: (info: ActionInfo) => boolean;
};

export function useLoading(): UseLoadingProps {
  const [loading, setLoading] = useState(false);
  const handleTxDispatch = ({ status }: ActionInfo) => {
    if (status === "rejected") {
      setLoading(false);
      return false;
    }
    return true;
  };

  return { loading, setLoading, handleTxDispatch };
}
