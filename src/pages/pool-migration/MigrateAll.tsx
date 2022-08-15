import { useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ScaledNumber } from "scaled-number";
import styled from "styled-components";
import { useMero } from "../../app/hooks/use-mero";
import InfoBlock from "../../components/InfoBlock";
import Popup from "../../components/Popup";
import Status, { StatusType } from "../../components/Status";
import { Pool } from "../../lib";
import { Optional } from "../../lib/types";
import { INFINITE_APPROVE_AMMOUNT } from "../../lib/constants";
import { DISCORD_LINK } from "../../lib/links";
import { migrateAll, selectOldPools } from "../../state/poolsListSlice";
import { hasPendingTransaction } from "../../state/transactionsSlice";
import { approve, selectAllowances, selectBalances } from "../../state/userSlice";
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

const MigrateAll = ({ migrating, close }: Props): Optional<JSX.Element> => {
  const { t } = useTranslation();
  const mero = useMero();
  const dispatch = useDispatch();

  const pools = useSelector(selectOldPools);
  const balances = useSelector(selectBalances);
  const allowances = useSelector(selectAllowances);
  const approveLoading = useSelector(hasPendingTransaction("Approve"));
  const migrateAllLoading = useSelector(hasPendingTransaction("MigrateAll"));

  const hasLoaded = pools && balances;

  const depositedPools = hasLoaded
    ? pools.filter((pool: Pool) => {
        const lpBalance = balances[pool.lpToken.address];
        const stakedBalance = balances[pool.stakerVaultAddress];
        return (lpBalance && !lpBalance.isZero()) || (stakedBalance && !stakedBalance.isZero());
      })
    : null;

  const TOTAL_STEPS = depositedPools ? depositedPools.length + 1 : 1;

  const isApproved = (pool: Pool): boolean => {
    if (!mero) return false;
    const plainAllowance = allowances[pool.lpToken.address]?.[mero.poolMigrationZapAddres];
    if (!plainAllowance) return false;
    return !ScaledNumber.fromPlain(plainAllowance).isZero();
  };

  const poolsApproved = depositedPools
    ? depositedPools.filter((pool: Pool) => isApproved(pool)).length
    : null;

  const activePool =
    depositedPools && poolsApproved !== null ? depositedPools[poolsApproved] : null;

  const allPoolsApproved = depositedPools ? poolsApproved === depositedPools.length : false;

  useEffect(() => {
    if (!mero || !depositedPools || !migrating) return;
    if (!allPoolsApproved && activePool) {
      dispatch(
        approve({
          token: activePool.lpToken,
          spender: mero.poolMigrationZapAddres,
          amount: ScaledNumber.fromUnscaled(INFINITE_APPROVE_AMMOUNT),
          mero,
        })
      );
    }
    if (allPoolsApproved && depositedPools.length > 0) {
      dispatch(
        migrateAll({ mero, poolAddresses: depositedPools.map((pool: Pool) => pool.address) })
      );
    }
  }, [poolsApproved, TOTAL_STEPS, migrating]);

  if (depositedPools && depositedPools.length === 0) return null;

  return (
    <Popup
      show={migrating}
      close={close}
      header={`${poolsApproved || 0 + 1}/${TOTAL_STEPS} ${t("poolMigration.transactions.header")}`}
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
              ...(depositedPools?.map((pool: Pool) => {
                return {
                  label: t("amountInput.approve", { asset: pool.lpToken.symbol }),
                  tooltip: t("poolMigration.transactions.approveTooltip", {
                    asset: pool.lpToken.symbol,
                  }),
                  value: (
                    <Status
                      large
                      status={
                        isApproved(pool)
                          ? StatusType.SUCCESS
                          : activePool && activePool.address === pool.address && approveLoading
                          ? StatusType.PENDING
                          : StatusType.EMPTY
                      }
                    />
                  ),
                };
              }) || []),
              {
                label: t("poolMigration.transactions.migrate"),
                tooltip: t("poolMigration.transactions.migrateTooltip"),
                value: (
                  <Status
                    large
                    status={migrateAllLoading ? StatusType.PENDING : StatusType.EMPTY}
                  />
                ),
              },
            ],
          ]}
        />
      </StyledMigrateAll>
    </Popup>
  );
};

export default MigrateAll;
