/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import type {
  GetOriginalImagesImageOriginalGetParams,
  GetPredictedImagesImagePredictedGetParams
} from '../../schemas'
import { customInstance } from '../../custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  /**
 * 원본 이미지를 반환하는 함수입니다.

(JPEG Buffer)
 * @summary Get Original Images
 */
export const getOriginalImagesImageOriginalGet = (
    params: GetOriginalImagesImageOriginalGetParams,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/image/original`, method: 'GET',
        params
    },
      options);
    }
  /**
 * 예측된 이미지를 반환하는 함수입니다.

(JPEG Buffer)
 * @summary Get Predicted Images
 */
export const getPredictedImagesImagePredictedGet = (
    params: GetPredictedImagesImagePredictedGetParams,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/image/predicted`, method: 'GET',
        params
    },
      options);
    }
  export type GetOriginalImagesImageOriginalGetResult = NonNullable<Awaited<ReturnType<typeof getOriginalImagesImageOriginalGet>>>
export type GetPredictedImagesImagePredictedGetResult = NonNullable<Awaited<ReturnType<typeof getPredictedImagesImagePredictedGet>>>