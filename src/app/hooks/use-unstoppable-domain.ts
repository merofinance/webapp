import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { unstoppableDomainsConnector as connector } from "../web3";
import { useWeb3Updated } from "./use-web3-updated";

const useUnstopabbleDomain = (): string | null => {
  const { account } = useWeb3React();
  const updated = useWeb3Updated();
  const [domain, setDomain] = useState<string | null>(null);

  const getDomain = async () => {
    if (!account) return;
    const user = await connector.uauth.user();
    if (user) setDomain(user.sub);
    else setDomain(null);
  };

  useEffect(() => {
    getDomain();
  }, [updated, connector]);

  return domain;
};

export default useUnstopabbleDomain;
