import { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { cn } from '@/lib/utils';
import { toggleMenuNavButton } from '@/lib/framer';
import axios from 'axios';
import {format, startOfToday} from "date-fns"

function NavToggle(props: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  
  const today = startOfToday();
  const formattedToday = format(today, "yyyy-MM-dd");


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://www.amandine-server.kmllr.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/entities&types=employees`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Amelia': '4LT+lvQqlUgLHex341s4iE3ZfwUbiJnizaRBSqTK3peJ',
          'Accept': "*/*",
        },
        // withCredentials: true,
      });

      const response2 = await axios.get(`https://www.amandine-server.kmllr.fr/wp-admin/admin-ajax.php?action=wpamelia_api&call=/api/v1/stats&date=${formattedToday},2023-11-20`, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Amelia': '4LT+lvQqlUgLHex341s4iE3ZfwUbiJnizaRBSqTK3peJ',
          'Accept': "*/*",
        },
        // withCredentials: true,
      });

      // Vous pouvez traiter les données de la réponse ici
      console.log(response);
    } catch (error) {
      // Gérez les erreurs ici
      console.error('Erreur lors de la récupération des services:', error);
    }
  };

  // Appelez la fonction fetchData au chargement de la page
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="text-white w-fit h-16 px-4 relative z-40 ">
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
          "fixed top-0 bottom-0 bg-secondary/90 w-full z-30 transition-all duration-500",
          isOpen ? "left-0" : "-left-full"
        )}
      >
        <ul className="flex flex-col h-full w-full items-center justify-center gap-5 relative">
          {props.link}
        </ul>
      </div>
    </>
  )
}

export default NavToggle
