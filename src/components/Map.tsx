import { useEffect, useState } from "react";

import { TMap } from "../types/tmap";

const { Tmapv3 } = window;

export const Map = () => {
  const [instance, setInstance] = useState<TMap | null>(null);

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
