import { motion } from "framer-motion";

interface AvatarProps {
  animal: string;
  position: { x: number, y: number };
}

export default function Avatar({ animal, position }: AvatarProps) {
  return (
    <motion.div
      className="absolute w-24 h-24 bg-green-300 rounded-full flex items-center justify-center shadow-xl text-center font-bold"
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      {animal}
    </motion.div>
  );
}