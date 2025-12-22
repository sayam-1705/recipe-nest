"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import FloatingCard from "./FloatingCard";

export default function RecipeScene3D() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#B026FF" />
          <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} color="#FF006E" />

          {/* Floating Recipe Cards */}
          <FloatingCard position={[-3, 0, 0]} color="#00F0FF" />
          <FloatingCard position={[0, 0, -1]} color="#B026FF" scale={1.2} />
          <FloatingCard position={[3, 0, 0]} color="#FF006E" />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
