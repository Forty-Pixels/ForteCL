'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type PackagesMenuItem = {
    label?: string | null;
    badge?: string | null;
    title: string;
    slug: string;
    amount?: number | null;
};

export type PackagesMenu = {
    enabled?: boolean | null;
    viewAllLabel?: string | null;
    items?: PackagesMenuItem[] | null;
} | null;

const PackagesMenuContext = createContext<PackagesMenu>(null);

export function PackagesMenuProvider({ value, children }: { value: PackagesMenu; children: ReactNode }) {
    return <PackagesMenuContext.Provider value={value}>{children}</PackagesMenuContext.Provider>;
}

export function usePackagesMenu() {
    return useContext(PackagesMenuContext);
}
