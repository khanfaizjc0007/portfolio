"use client"

import dynamic from "next/dynamic"
import type { ReactNode } from "react"

const SmoothScroll = dynamic(
  () => import("@/components/smooth-scroll").then(mod => ({ default: mod.SmoothScroll })),
  { ssr: false, loading: () => <></> }
)

export function SmoothScrollWrapper({ children }: { children: ReactNode }) {
  return <SmoothScroll>{children}</SmoothScroll>
}
