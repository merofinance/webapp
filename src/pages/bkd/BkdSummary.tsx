import SummaryStatistics from "../../components/SummaryStatistics";

const BkdSummary = (): JSX.Element => {
  return (
    <SummaryStatistics
      statistics={[
        {
          label: "Header 1",
          value: "$1,243.34",
        },
        {
          label: "Header 2",
          value: "$65,530.34",
        },
      ]}
    />
  );
};

export default BkdSummary;
