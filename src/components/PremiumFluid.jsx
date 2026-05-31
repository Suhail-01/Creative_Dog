import React from "react";
import { EffectComposer } from "@react-three/postprocessing";
import { Fluid } from "@whatisjery/react-fluid-distortion";

export default function PremiumFluid() {
  return (
    <EffectComposer multisampling={0}>
      <Fluid
        fluidColor="#111111"
        rainbow={false}
        showBackground={false}
        intensity={2.2}
        force={1.4}
        distortion={0.55}
        radius={0.18}
        curl={26}
        swirl={8}
        velocityDissipation={0.985}
        densitionDissipation={0.965}
        pressure={0.82}
      />
    </EffectComposer>
  );
}