/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * FastAPI
 * OpenAPI spec version: 0.1.0
 */
import { customInstance } from '../../custom-instance';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  /**
 * @summary Root
 */
export const rootGet = (
    
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<unknown>(
      {url: `/`, method: 'GET'
    },
      options);
    }
  export type RootGetResult = NonNullable<Awaited<ReturnType<typeof rootGet>>>
