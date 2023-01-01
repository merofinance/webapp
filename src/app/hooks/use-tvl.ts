import { useEffect, useState } from "react";
import { ScaledNumber } from "scaled-number";
import { Optional } from "../../lib/types";

const useTvl = (): Optional<ScaledNumber> => {
  const [tvl, setTvl] = useState<Optional<ScaledNumber>>(null);

  const fetchTvl = async () => {
    const response = await fetch("https://api.llama.fi/tvl/mero");
    const data = await response.json();
    setTvl(ScaledNumber.fromUnscaled(data));
  };

  useEffect(() => {
    fetchTvl();
  }, []);

  return tvl;
};

export default useTvl;
