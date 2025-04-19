'use client';

import { Project } from '@/types/project';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type BreadcrumbItem = {
  title: string;
  link: string;
};

export function useBreadcrumbs(projects?: Project[]) {
  const pathname = usePathname();

  const routeMapping: Record<string, BreadcrumbItem[]> = useMemo(() => {
    // Create the static breadcrumb mappings first
    const staticRouteMapping: Record<string, BreadcrumbItem[]> = {
      '/dashboard': [{ title: 'Dashboard', link: '/dashboard' }],
      '/dashboard/employee': [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Employee', link: '/dashboard/employee' }
      ],
      '/dashboard/product': [
        { title: 'Dashboard', link: '/dashboard' },
        { title: 'Product', link: '/dashboard/product' }
      ],
    };

    // Dynamically generate route mapping for /dashboard/projects/{project.id}
    if (projects) {
      const projectRoutes = projects.reduce((acc, project) => {
        const projectPath = `/dashboard/projects/${project.id}`;
        acc[projectPath] = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Projects', link: '/dashboard/projects' },
          { title: project.name, link: projectPath }
        ];
        return acc;
      }, {} as Record<string, BreadcrumbItem[]>);

      // Merge static routes with the dynamic project routes
      return { ...staticRouteMapping, ...projectRoutes };
    }

    return staticRouteMapping;
  }, [projects]);

  const breadcrumbs = useMemo(() => {
    // If there's an exact match in the route mapping, return the corresponding breadcrumbs
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Handle nested routes (e.g., /dashboard/projects/{project.id}/settings)
    const segments = pathname.split('/').filter(Boolean);

    // Check if the route starts with `/dashboard/projects/{project.id}`
    if (segments[0] === 'dashboard' && segments[1] === 'projects') {
      const projectId = segments[2];
      const project = projects?.find((p) => p.id === projectId);

      if (project) {
        const baseProjectPath = `/dashboard/projects/${projectId}`;
        const baseBreadcrumbs: BreadcrumbItem[] = [
          { title: 'Dashboard', link: '/dashboard' },
          { title: 'Projects', link: '/dashboard/projects' },
          { title: project.name, link: baseProjectPath }
        ];

        // Handle nested route (e.g., /settings)
        const nestedBreadcrumbs = segments.slice(3).map((segment, index) => {
          const path = `${baseProjectPath}/${segments.slice(3, index + 1).join('/')}`;
          return {
            title: segment.charAt(0).toUpperCase() + segment.slice(1),
            link: path
          };
        });

        return [...baseBreadcrumbs, ...nestedBreadcrumbs];
      }
    }

    // Default breadcrumb generation based on the pathname
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        link: path
      };
    });
  }, [pathname, routeMapping, projects]);

  return breadcrumbs;
}
