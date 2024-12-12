import { useEffect, useState } from "react";

import { TMap } from "../types/tmap";

const { Tmapv3 } = window;

export const Map = () => {
  const [instance, setInstance] = useState<TMap | null>(null);

  useEffect(() => {
    if (instance) return;

    console.log(instance);

    const map = new Tmapv3.Map("map", {
      center: new Tmapv3.LatLng(37.570028, 126.982786),
      width: "100vw",
      height: "100dvh",
      zoom: 15,
    });

    setInstance(map);
  }, [instance]);

  return <div id="map"></div>;
};
