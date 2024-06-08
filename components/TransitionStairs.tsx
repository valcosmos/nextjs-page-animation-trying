'use client'

import type { MotionProps } from 'framer-motion'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import React from 'react'
import { usePathname } from 'next/navigation'
import { FrozenRouter } from './FrozenRouter'

const expand: MotionProps['variants'] = {
  initial: {
    top: 0,
  },
  enter: i => ({
    top: '100vh',
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
    transitionEnd: { height: '0', top: '0' },
  }),
  exit: i => ({
    height: '100vh',
    transition: {
      duration: 0.4,
      delay: 0.05 * i,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
}
const opacity: MotionProps['variants'] = {
  initial: {
    opacity: 0.5,
  },
  enter: {
    opacity: 0,
  },
  exit: {
    opacity: 0.5,
  },
}

export default function TransitionStairs({ children }: { children: ReactNode }) {
  const path = usePathname()

  const anim = (
    variants: MotionProps['variants'],
    custom: MotionProps['custom'] = null,
  ): MotionProps => {
    return {
      initial: 'initial',
      animate: 'enter',
      exit: 'exit',
      custom,
      variants,
    }
  }

  const nbOfColumns = 5
  return (
    <AnimatePresence mode="wait">
      <div key={path}>
        <motion.div
          {...anim(opacity)}
          className="fixed w-full h-full bg-black z-20 pointer-events-none top-0 left-0"
        />
        <div className="fixed w-screen h-screen flex left-0 top-0 pointer-events-none z-30">
          {[...Array(nbOfColumns)].map((_, i) => {
            return (
              <motion.div
                key={i}
                {...anim(expand, nbOfColumns - i)}
                className="relative h-full w-full bg-black"
              />
            )
          })}
        </div>
        <FrozenRouter>{children}</FrozenRouter>
      </div>
    </AnimatePresence>
  )
}
