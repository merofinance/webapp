import { useTranslation } from "react-i18next";
import SummaryStatistics from "../../components/SummaryStatistics";

const ClaimSummary = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <SummaryStatistics
      statistics={[
        {
          label: t("claim.overview.claimable"),
          value: "$1,243.34",
        },
        {
          label: t("claim.overview.deposits"),
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default ClaimSummary;
