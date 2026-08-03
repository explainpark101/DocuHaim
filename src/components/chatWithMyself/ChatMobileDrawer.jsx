import { AnimatePresence, motion } from 'motion/react';

const SPRING = { type: 'spring', stiffness: 380, damping: 36 };

/**
 * Mobile right-edge drawer with backdrop + slide animation (Motion).
 * @param {'80vw'|'100%'} [width='80vw']
 */
export default function ChatMobileDrawer({
  open,
  onClose,
  width = '80vw',
  zClass = 'z-70',
  label = '패널',
  children,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key={`chat-drawer-${label}`}
          className={`fixed inset-0 ${zClass}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/35"
            aria-label={`${label} 닫기`}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="absolute inset-y-0 right-0 flex max-w-full flex-col overflow-hidden border-l border-gray-200 bg-white shadow-xl dark:border-odp-borderSoft dark:bg-odp-bgSoft"
            style={{ width }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={SPRING}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
