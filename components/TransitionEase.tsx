'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'
import { FrozenRouter } from './FrozenRouter'

const variants = {
  hidden: { opacity: 0, y: 100 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100 }
}

export default function TransitionEase({ children }: { children: ReactNode }) {
  const key = usePathname()

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
