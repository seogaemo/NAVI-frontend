import { useEffect, useState } from "react";

import { ProcessingResult } from "../libs/api/schemas";
import { TMap } from "../types/tmap";

const { Tmapv3 } = window;

interface Props {
  route: ProcessingResult | null;
}

export const Map = ({ route }: Props) => {
  const [instance, setInstance] = useState<TMap | null>(null);

  useEffect(() => {
    if (!instance || !route) return;

    new Tmapv3.Marker({
      position: new Tmapv3.LatLng(route.points[0].lat, route.points[0].lng),
      map: instance,
    });

    new Tmapv3.Marker({
      position: new Tmapv3.LatLng(
        route.points[route.points.length - 1].lat,
        route.points[route.points.length - 1].lng
      ),
      map: instance,
    });

    new Tmapv3.Polyline({
      path: route.points.map(
        (point) => new Tmapv3.LatLng(point.lat, point.lng)
      ),
      strokeColor: "#ff0000",
      strokeWeight: 6,
      map: instance,
    });

    const bounds = new Tmapv3.LatLngBounds();

    route.points.forEach((point) => {
      bounds.extend(new Tmapv3.LatLng(point.lat, point.lng));
    });

    instance.fitBounds(bounds, 200);
  }, [instance, route]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        instance?.setCenter(
          new Tmapv3.LatLng(position.coords.latitude, position.coords.longitude)
        );
      });
    }
  }, [instance]);

  useEffect(() => {
    if (instance) return;

    const map = new Tmapv3.Map("map", {
      center: new Tmapv3.LatLng(37.55930390626646, 127.04323445018552),
      width: "100vw",
      height: "100dvh",
      zoom: 15,
    });

    setInstance(map);
  }, [instance]);

  return <div className="absolute top-0" id="map"></div>;
};
