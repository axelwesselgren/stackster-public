"use client";

import { ComponentOfTheDay } from "@/components/custom/dashboard/ComponentDaily";
import { ContributionChart } from "@/components/custom/dashboard/ContributionChart";
import { OrgStatistics } from "@/components/custom/dashboard/OrgStatistics";
import { RecentComponent } from "@/components/custom/dashboard/RecentComponent";
import { RecentProjects } from "@/components/custom/dashboard/RecentProjects";
import React from "react";

export default function Dashboard() {
  return (
    <div className="w-full h-full max-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-[1600px] mx-auto">
        <div className="lg:row-span-2 flex flex-col gap-4">
          <RecentProjects className="w-full h-full" />
          <OrgStatistics className="w-full h-full" />
        </div>
        <div className="lg:col-span-2 flex flex-col md:flex-row gap-4">
          <RecentComponent className="w-full h-full" />
          <ComponentOfTheDay className="w-full h-full" />
        </div>
        <ContributionChart className="lg:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}