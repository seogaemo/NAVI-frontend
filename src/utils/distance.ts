import { Poi } from "../libs/api/schemas";

export const getDistance = (start: Poi, end: Poi) => {
  const lat1 = start.frontLon;
  const lon1 = start.frontLat;
  const lat2 = end.frontLon;
  const lon2 = end.frontLat;

  if (!(lat1 && lon1 && lat2 && lon2)) return 0;

  const radLat1 = (Math.PI * lat1) / 180;
  const radLat2 = (Math.PI * lat2) / 180;
  const theta = lon1 - lon2;
  const radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  if (dist > 1) dist = 1;

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515 * 1.609344 * 1000;
  if (dist < 100) dist = Math.round(dist / 10) * 10;
  else dist = Math.round(dist / 100) * 100;

  return dist;
};
