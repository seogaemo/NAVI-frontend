/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type { PedestrianRouteResponseFeature } from './pedestrianRouteResponseFeature';

/**
 * 보행자 경로 안내 응답 정보를 담는 DTO입니다.
 */
export interface PedestrianRouteResponse {
  features: PedestrianRouteResponseFeature[];
  /** GeoJSON 유형 */
  type: string;
}
