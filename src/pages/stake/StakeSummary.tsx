import { useTranslation } from "react-i18next";
import SummaryStatistics from "../../components/SummaryStatistics";

const StakeSummary = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <SummaryStatistics
      statistics={[
        {
          label: t("stake.overview.claimable"),
          value: "$1,243.34",
        },
        {
          label: t("stake.overview.deposits"),
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default StakeSummary;
