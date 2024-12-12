/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { EvChargerChargerId } from './evChargerChargerId';
import type { EvChargerChargingDateTime } from './evChargerChargingDateTime';
import type { EvChargerIsAvailable } from './evChargerIsAvailable';
import type { EvChargerIsFast } from './evChargerIsFast';
import type { EvChargerOperatorId } from './evChargerOperatorId';
import type { EvChargerOperatorName } from './evChargerOperatorName';
import type { EvChargerPowerType } from './evChargerPowerType';
import type { EvChargerStationId } from './evChargerStationId';
import type { EvChargerStatus } from './evChargerStatus';
import type { EvChargerType } from './evChargerType';
import type { EvChargerUpdateDateTime } from './evChargerUpdateDateTime';

export interface EvCharger {
  /** 충전기 ID */
  chargerId?: EvChargerChargerId;
  /** 마지막 충전 시각 */
  chargingDateTime?: EvChargerChargingDateTime;
  /** 충전기 사용 가능 여부 */
  isAvailable?: EvChargerIsAvailable;
  /** 급속 충전 여부 */
  isFast?: EvChargerIsFast;
  /** EV 충전소 제공업체 */
  operatorId?: EvChargerOperatorId;
  /** 제공업체명 */
  operatorName?: EvChargerOperatorName;
  /** EV 충전기 충전량 */
  powerType?: EvChargerPowerType;
  /** 충전소 ID */
  stationId?: EvChargerStationId;
  /** 충전기 상태 정보 */
  status?: EvChargerStatus;
  /** 충전기 타입 정보 */
  type?: EvChargerType;
  /** 충전 관련 데이터 최종 변경 시각 */
  updateDateTime?: EvChargerUpdateDateTime;
}
