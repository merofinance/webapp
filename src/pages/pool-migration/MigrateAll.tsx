import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import styled from "styled-components";
import InfoBlock from "../../components/InfoBlock";
import Popup from "../../components/Popup";
import Status, { StatusType } from "../../components/Status";
import { DISCORD_LINK } from "../../lib/links";
import { GradientLink } from "../../styles/GradientText";

const StyledMigrateAll = styled.div`
  display: flex;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-bottom: 2.1rem;
`;

const Link = styled(GradientLink)`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
`;

interface Props {
  migrating: boolean;
  close: () => void;
}

const MigrateAll = ({ migrating, close }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const TOTAL_STEPS = 4; // TODO

  return (
    <Popup
      show={migrating}
      close={close}
      header={`${step}/${TOTAL_STEPS} ${t("poolMigration.transactions.header")}`}
    >
      <StyledMigrateAll>
        <Body>
          <Trans i18nKey="poolMigration.transactions.body">
            <Link href={DISCORD_LINK} target="_blank" rel="noopener noreferrer">
              {t("footer.community.links.discord")}
            </Link>
          </Trans>
        </Body>
        <InfoBlock
          sections={[
            [
              {
                label: t("amountInput.approve", { asset: "bkdDAI" }),
                tooltip: t("poolMigration.transactions.approveTooltip", { asset: "bkdDAI" }),
                value: <Status large status={StatusType.SUCCESS} />,
              },
              {
                label: t("amountInput.approve", { asset: "bkdUSDC" }),
                tooltip: t("poolMigration.transactions.approveTooltip", { asset: "bkdUSDC" }),
                value: <Status large status={StatusType.PENDING} />,
              },
              {
                label: t("amountInput.approve", { asset: "bkdETH" }),
                tooltip: t("poolMigration.transactions.approveTooltip", { asset: "bkdETH" }),
                value: <Status large status={StatusType.EMPTY} />,
              },
              {
                label: t("poolMigration.transactions.migrate"),
                tooltip: t("poolMigration.transactions.migrateTooltip"),
                value: <Status large status={StatusType.EMPTY} />,
              },
            ],
          ]}
        />
      </StyledMigrateAll>
    </Popup>
  );
};

export default MigrateAll;
