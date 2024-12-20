/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { SearchPoiInfoCount } from './searchPoiInfoCount';
import type { SearchPoiInfoPage } from './searchPoiInfoPage';
import type { SearchPoiInfoPois } from './searchPoiInfoPois';
import type { SearchPoiInfoTotalCount } from './searchPoiInfoTotalCount';

export interface SearchPoiInfo {
  /** 페이지당 조회 결과 수 */
  count?: SearchPoiInfoCount;
  /** 조회한 페이지 번호 */
  page?: SearchPoiInfoPage;
  /** 관심 장소(POI) 목록 */
  pois?: SearchPoiInfoPois;
  /** 조회 결과의 총 개수 */
  totalCount?: SearchPoiInfoTotalCount;
}
