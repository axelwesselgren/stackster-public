"use client";

import { LoadingScreen } from "@/components/states/loading-screen";
import { DiscoverHeader } from "@/components/headers/discover-header";
import { useDiscoverComponents } from "@/hooks/use-discover-components";
import { ErrorScreen } from "@/components/states/error-screen";
import { DiscoverCard } from "@/components/cards/discover-card";

export default function ExploreComponents() {
  const { error, loading, components } = useDiscoverComponents();
  
  if (error) {
    return <ErrorScreen title="Error" message={error.message} />
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <>
      <DiscoverHeader />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {components.map((component, index) => (
          <DiscoverCard component={component} key={index} />
        ))}
      </div>
    </>
  )
}