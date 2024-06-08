'use client'

import { AnimatePresence, MotionProps, motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { FrozenRouter } from './FrozenRouter'

const perspective: MotionProps['variants'] = {
  initial: {
    scale: 1,
    y: 0
  },
  enter: {
    scale: 1,
    y: 0
  },
  exit: {
    scale: 0.9,
    y: -150,
    opacity: 0.5,
    transition: {
      duration: 1.2,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const slide: MotionProps['variants'] = {
  initial: {
    y: '100vh'
  },
  enter: {
    y: '100vh'
  },
  exit: {
    y: 0,
    transition: {
      duration: 1,
      ease: [0.76, 0, 0.24, 1]
    }
  }
}

const opacity: MotionProps['variants'] = {
  initial: {
    opacity: 0
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 1
  }
}

const anim = (variants: MotionProps['variants']): MotionProps => {
  return {
    initial: 'initial',
    animate: 'enter',
    exit: 'exit',
    variants
  }
}

export default function TransitionInner({ children }: { children: ReactNode }) {
  const path = usePathname()

  return (
    <AnimatePresence mode="wait">
      <div key={path} className="bg-black">
        <motion.div
          className="h-screen w-full fixed left-0 top-0 bg-white z-[1]"
          {...anim(slide)}
        />
        <motion.div className="bg-white" {...anim(perspective)}>
          <motion.div {...anim(opacity)}>
            <header className="fixed z-[12] top-0 left-0 w-screen h-8">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
            </header>
            <FrozenRouter>{children}</FrozenRouter>
          </motion.div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
