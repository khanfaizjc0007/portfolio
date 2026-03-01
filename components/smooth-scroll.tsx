"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import Lenis only on client side
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      })

      lenisRef.current = lenis

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    })

    return () => {
      lenisRef.current?.destroy()
    }
  }, [])

  return <>{children}</>
}
