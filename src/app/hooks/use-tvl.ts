import { useEffect, useState } from "react";
import { ScaledNumber } from "scaled-number";
import { Optional } from "../../lib/types";

interface LastHourlyRecord {
  ethereum: number;
  tvlPrev1Week: number;
  tvlPrev1Day: number;
  SK: number;
  tvl: number;
  PK: string;
  tvlPrev1Hour: number;
}

interface Response {
  lastHourlyRecord: LastHourlyRecord;
}

const useTvl = (): Optional<ScaledNumber> => {
  const [tvl, setTvl] = useState<Optional<ScaledNumber>>(null);

  const fetchTvl = async () => {
    const response = await fetch("https://api.llama.fi/tvl/mero");
    const data: Response = await response.json();
    setTvl(ScaledNumber.fromUnscaled(data.lastHourlyRecord.tvl));
  };

  useEffect(() => {
    fetchTvl();
  }, []);

  return tvl;
};

export default useTvl;
