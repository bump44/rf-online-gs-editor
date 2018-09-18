import { isFinite } from 'lodash';

const DEFENCE_FACING_FALLBACK_VALUE = 1;

export const getDefenceFacingPresentValue = ({ defFacing, defGap = 0.5 }) => {
  const f =
    isFinite(defFacing) && defFacing > 0
      ? defFacing
      : DEFENCE_FACING_FALLBACK_VALUE;
  return parseInt((100 / f) ** (10 / 13) + defGap, 10);
};

export const getDefenctFacingUnpresentValue = ({
  presentValue,
  defGap = 0.5,
}) => {
  const i = isFinite(presentValue) && presentValue >= 0 ? presentValue : 1;
  return (
    parseFloat(100 / (i - defGap) ** (13 / 10)) || DEFENCE_FACING_FALLBACK_VALUE
  );
};
