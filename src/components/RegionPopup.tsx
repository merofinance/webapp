import useGeoLocation from "react-ipgeolocation";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { selectUsersTotalUsdEverywhere } from "../state/valueSelectors";
import Popup from "./Popup";
import { PROTOCOL_PAGES } from "../lib/constants";

interface CountryData {
  code: string;
  name: string;
}
const BLOCKED_COUNTRIES: CountryData[] = [
  {
    name: "United Kingdom",
    code: "GB",
  },
  {
    name: "United States",
    code: "US",
  },
  {
    name: "Belarus",
    code: "BY",
  },
  {
    name: "Burma",
    code: "MM",
  },
  {
    name: "China",
    code: "CN",
  },
  {
    name: "Cuba",
    code: "CU",
  },
  {
    name: "Congo",
    code: "CD",
  },
  {
    name: "Iran",
    code: "IR",
  },
  {
    name: "Iraq",
    code: "IQ",
  },
  {
    name: "Liberia",
    code: "LR",
  },
  {
    name: "North Korea",
    code: "KP",
  },
  {
    name: "Sudan",
    code: "SD",
  },
  {
    name: "Syria",
    code: "SY",
  },
  {
    name: "Zimbabwe",
    code: "ZW",
  },
];

const RegionPopup = (): JSX.Element | null => {
  const navigate = useNavigate();

  const deposited = useSelector(selectUsersTotalUsdEverywhere);
  const location = useLocation();
  const ipLocation = useGeoLocation();

  const country = ipLocation?.country ?? null;

  useEffect(() => {
    if (country) alert(country);
  }, [country]);

  if (!ipLocation) return null;

  const hasDeposits = !!deposited && !deposited.isZero();
  const countryData = BLOCKED_COUNTRIES.find((country) => country.code === ipLocation.country);
  const blocked = countryData !== undefined;
  const countryName = countryData?.name;
  const inProtocolPage = PROTOCOL_PAGES.includes(location.pathname.split("/")[1]);

  return (
    <Popup
      centerHeader
      show={blocked && !hasDeposits && inProtocolPage}
      close={() => navigate("/")}
      header="Unsupported Region"
      body={`Mero access is currently not granted to residents of ${countryName}`}
    />
  );
};

export default RegionPopup;
