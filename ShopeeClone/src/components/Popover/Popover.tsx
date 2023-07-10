import React, { useState, useRef, useId } from 'react'
import { FloatingPortal, useFloating, arrow, offset, type Placement } from '@floating-ui/react-dom-interactions'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  initialOpen?: boolean
  placement?: Placement
}

export default function Popover({ children, renderPopover, className, initialOpen, placement }: Props) {
  const [open, setOpen] = useState(initialOpen || false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, reference, floating, strategy, middlewareData } = useFloating({
    middleware: [offset(6), arrow({ element: arrowRef })],
    // placement: 'bottom-end' // căn cho popover
    placement: placement
  })

  const showPopover = () => {
    setOpen(true)
  }

  const hidePopover = () => {
    setOpen(false)
  }

  // hook useId: mỗi lần component Popover chạy => sinh ra 1 id mới
  // bên MainHeader sẽ gọi 3 lần Popover cho lần -> 3 id mới
  const id = useId()

  return (
    <div>
      <div
        className={className}
        ref={reference}
        // hold chuột vào nó sẽ show ra còn không ẩn đi
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
        <FloatingPortal id={id}>
          <AnimatePresence>
            {open && (
              <motion.div
                ref={floating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content'
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.3 }}
              >
                <span
                  ref={arrowRef}
                  className='absolute z-10 translate-y-[-95%] border-[11px] border-x-transparent 
                       border-b-white border-t-transparent'
                  style={{
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                ></span>

                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </div>
  )
}

// giá trị Props:

// className:
/* item-center flex cursor-pointer py-1 hover:text-gray-300 */

// children: bao gồm (world + Tiếng Việt + Mũi tên)
{
  /* <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
            < /svg> */
}

// renderPopover: phần khi hold chuột vào mũi tên xổ xuống 2 giá trị: Tiếng Việt, English
{
  /* <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                      <div className='flex flex-col px-3 py-2'>
                        <button className='px-3 py-2 hover:text-orange'>Tiếng Việt</button>
                        <button className='mt-2 px-3 py-2 hover:text-orange'>English</button>
                      </div>
                    </div> */
}
