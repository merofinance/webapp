import styled from "styled-components";
import useGeoLocation from "react-ipgeolocation";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { selectUsersTotalUsdEverywhere } from "../state/valueSelectors";
import Popup from "./Popup";
import { PROTOCOL_PAGES } from "../lib/constants";

interface CountryData {
  code: string;
  name: string;
}
const BLOCKED_COUNTRIES: CountryData[] = [
  {
    code: "GB",
    name: "United Kingdom",
  },
  {
    code: "US",
    name: "United States",
  },
];

const RegionPopup = (): JSX.Element | null => {
  const navigate = useNavigate();

  const deposited = useSelector(selectUsersTotalUsdEverywhere);
  const location = useLocation();
  const ipLocation = useGeoLocation();

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
      body={`Mero access currently not granted to residents of ${countryName}`}
    />
  );
};

export default RegionPopup;
