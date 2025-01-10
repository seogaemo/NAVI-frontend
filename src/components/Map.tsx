import { useEffect, useState } from "react";

import { ProcessingMultiResult, ProcessingResult } from "../libs/api/schemas";
import { TMap, TMapEvent, TMapMarker, TMapPolyline } from "../types/tmap";

const { Tmapv3 } = window;

interface Props {
  route: ProcessingResult | null;
  routes?: ProcessingResult | ProcessingMultiResult;
}

export const Map = ({ route, routes }: Props) => {
  const [instance, setInstance] = useState<TMap | null>(null);

  const [routeObjects, setRouteObjects] = useState<{
    start: TMapMarker;
    end: TMapMarker;
    polyline?: TMapPolyline[];
  }>();

  const [clickMarker, setClickMarker] = useState<TMapMarker | null>(null);

  useEffect(() => {
    if (!instance || !route) return;

    if (routeObjects) {
      routeObjects.start.setMap(null);
      routeObjects.end.setMap(null);
      routeObjects.polyline?.forEach((item) => item.setMap(null));
    }

    const start = new Tmapv3.Marker({
      position: new Tmapv3.LatLng(
        route.road.features[0].geometry.coordinates[1],
        route.road.features[0].geometry.coordinates[0]
      ),
      map: instance,
    });

    const end = new Tmapv3.Marker({
      position: new Tmapv3.LatLng(
        route.road.features[
          route.road.features.length - 1
        ].geometry.coordinates[1],
        route.road.features[
          route.road.features.length - 1
        ].geometry.coordinates[0]
      ),
      map: instance,
    });

    const polyline: TMapPolyline[] = [];
    if (
      routes &&
      "boulevard" in routes &&
      "shortest" in routes &&
      "suggestion" in routes
    )
      Object.values(routes)
        .sort((a, b) => (a === route ? 1 : 0) - (b === route ? 1 : 0))
        .forEach((item: ProcessingResult) => {
          polyline.push(
            new Tmapv3.Polyline({
              path: item.road.features
                .filter((point) => point.geometry.type === "LineString")
                .flatMap((point) => {
                  return (point.geometry.coordinates as [number, number][]).map(
                    (c) => new Tmapv3.LatLng(c[1], c[0])
                  );
                }),
              strokeColor: item === route ? "#ff0000" : "#727272",
              strokeWeight: 6,
              map: instance,
            })
          );
        });
    else
      polyline.push(
        new Tmapv3.Polyline({
          path: route.road.features
            .filter((point) => point.geometry.type === "LineString")
            .flatMap((point) => {
              return (point.geometry.coordinates as [number, number][]).map(
                (c) => new Tmapv3.LatLng(c[1], c[0])
              );
            }),
          strokeColor: "#ff0000",
          strokeWeight: 6,
          map: instance,
        })
      );

    setRouteObjects({
      start,
      end,
      polyline,
    });

    const bounds = new Tmapv3.LatLngBounds();

    route.road.features.forEach((point) => {
      if (point.geometry.type === "Point") {
        bounds.extend(
          new Tmapv3.LatLng(
            point.geometry.coordinates[1],
            point.geometry.coordinates[0]
          )
        );
      }
    });

    instance.fitBounds(bounds, {
      top: 116 + 100,
      left: 100,
      right: 100,
      bottom: 200 + 100,
    });
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

  useEffect(() => {
    const handler = (e: TMapEvent) => {
      clickMarker?.setMap(null);

      const { lngLat } = e.data;

      setClickMarker(
        new Tmapv3.Marker({
          position: new Tmapv3.LatLng(lngLat._lat, lngLat._lng),
          map: instance,
        })
      );
    };

    instance?.on("Click", handler);

    return () => {
      instance?.off("Click");
    };
  }, [clickMarker, instance]);

  return <div className="absolute top-0" id="map"></div>;
};
