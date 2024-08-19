import { useState } from 'react'
import { motion } from "framer-motion"
import { cn } from '@/lib/utils';
import { toggleMenuNavButton } from '@/lib/framer';


function NavToggle(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="text-white w-fit h-16 px-4 relative z-40">
        <div className="h-full flex items-center w-fit">
          <div className="rounded-md border-[0.5px] border-accent-foreground p-[1px] relative z-50">
            <motion.div
              animate={isOpen ? "open" : "closed"}
              onClick={() => setIsOpen(!isOpen)}
              className="relative overflow-hidden z-1 flex flex-col gap-2 cursor-pointer py-2 px-4 rounded-md"
            >
              <motion.span
                variants={toggleMenuNavButton(-32, 17, 12)}
                className={cn("h-[1px] rounded-md bg-accent-foreground block", isOpen ? "w-[30px]" : " w-[20px]")}
              ></motion.span>
              <motion.span
                variants={toggleMenuNavButton(-90, 0)}
                className={cn("h-[1px] rounded-md block bg-accent-foreground", isOpen ? "w-[30px]" : "w-[25px]")}
              ></motion.span>
              <motion.span
                variants={toggleMenuNavButton(32, -1, -12)}
                className={cn("h-[1px] rounded-md w-[30px] block bg-accent-foreground")}
              ></motion.span>
            </motion.div>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed h-screen inset-0 bg-primary w-full z-[30] transition-all duration-500",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        <ul className="flex flex-col h-screen w-full items-center justify-center gap-5 relative">
          {props.link}
        </ul>
      </div>
    </>
  )
}

export default NavToggle
