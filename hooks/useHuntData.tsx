import { useMemo } from "react";
import { Hunt, ProcessedHunt } from "@slottisysteemit/types";

export function useHuntData(hunt: Hunt): ProcessedHunt {
  const processedHunt = useMemo<ProcessedHunt>(() => {
    let reqavg = 0;
    let winnings = 0;
    let openedBonusCount = 0;
    let unopenedBonusBets = 0;

    if (hunt.bonuses) {
      for (const bonus of hunt.bonuses) {
        if (bonus.payout !== undefined && bonus.payout !== null) {
          winnings += bonus.payout;
          openedBonusCount += 1;
        } else {
          unopenedBonusBets += bonus.bet;
        }
      }

      if (hunt.bonuses.length > 0) {
        const isAllBonusesOpened = openedBonusCount >= hunt.bonuses.length;

        if (!isAllBonusesOpened && winnings <= hunt.start) {
          reqavg = (hunt.start - winnings) / unopenedBonusBets;
        }
      }
    }

    return {
      ...{
        ...hunt,
        start: hunt.start.toFixed(2),
      },
      reqavg: reqavg.toFixed(2),
      winnings: winnings.toFixed(2),
    };
  }, [hunt]);

  return processedHunt;
}
