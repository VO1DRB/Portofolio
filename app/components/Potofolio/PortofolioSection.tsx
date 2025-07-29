"use client";
import { useState } from "react";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import Image from "next/image";

export default function PortofolioSection() {
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { key: "projects", label: "Projects" },
    { key: "designs", label: "Designs" },
    { key: "certificates", label: "Certificates" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "projects":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contoh 1 */}
            <SpotlightCard spotlightColor="rgba(0, 229, 255, 0.2)">
              <Image src="/assets/projects/project1.png" alt="Project 1" width={600} height={400} />
              <div className="p-4">
                <h3 className="text-xl font-bold">Project Title</h3>
                <p className="text-gray-300">Project description here.</p>
              </div>
            </SpotlightCard>
            {/* Tambahkan lebih banyak SpotlightCard di sini */}
          </div>
        );
      case "designs":
        return <div className="text-white">Coming soon: design showcase.</div>;
      case "certificates":
        return <div className="text-white">Coming soon: certificates list.</div>;
      default:
        return null;
    }
  };

  return (
    <section id="portfolio" className="bg-black text-white py-16 px-4 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">My Portfolio</h2>
          <div className="flex justify-center gap-4 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 rounded-lg transition ${
                  activeTab === tab.key
                    ? "bg-cyan-500 text-black font-semibold"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {renderContent()}
      </div>
    </section>
  );
}
