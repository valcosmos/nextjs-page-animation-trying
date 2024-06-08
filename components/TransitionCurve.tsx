'use client'

import type { MotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FrozenRouter } from './FrozenRouter'

export const text: MotionProps['variants'] = {
  initial: {
    opacity: 1,
  },
  enter: {
    opacity: 0,
    top: -100,
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { top: '47.5%' },
  },
  exit: {
    opacity: 1,
    top: '40%',
    transition: { duration: 0.5, delay: 0.4, ease: [0.33, 1, 0.68, 1] },
  },
}

export function curve(initialPath: string, targetPath: string): MotionProps['variants'] {
  return {
    initial: {
      d: initialPath,
    },
    enter: {
      d: targetPath,
      transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    },
  }
}

export const translate: MotionProps['variants'] = {
  initial: {
    top: '-300px',
  },
  enter: {
    top: '-100vh',
    transition: { duration: 0.75, delay: 0.35, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: {
      top: '100vh',
    },
  },
  exit: {
    top: '-300px',
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
}

const routes: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/contact': 'Contact',
}

function anim(variants: MotionProps['variants']): MotionProps {
  return {
    variants,
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
  }
}

function SVG({ height, width }: { width: number | null, height: number | null }) {
  if (!(height && width))
    return
  const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `

  const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `

  return (
    <motion.svg
      {...anim(translate)}
      className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-20"
    >
      <motion.path {...anim(curve(initialPath, targetPath))} />
    </motion.svg>
  )
}

export default function Transition({ children }: { children: React.ReactNode }) {
  const key = usePathname()

  const [dimensions, setDimensions] = useState<{ width: number | null, height: number | null }>({
    width: null,
    height: null,
  })

  useEffect(() => {
    function resize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <div key={key}>
        <div
          style={{ opacity: dimensions.width == null ? 1 : 0 }}
          className="fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 z-20"
        />
        <motion.p
          key={key}
          {...anim(text)}
          className="absolute w-screen top-[40%] text-white text-5xl z-30 text-center"
        >
          {routes[key]}
        </motion.p>
        {dimensions.width != null && <SVG {...dimensions} />}
        <FrozenRouter>{children}</FrozenRouter>
      </div>
    </AnimatePresence>
  )
}
