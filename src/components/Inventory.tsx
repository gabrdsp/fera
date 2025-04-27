interface InventoryProps {
  gems: number;
}

export default function Inventory({ diamantes }: InventoryProps) {
  return (
    <div className="absolute top-4 right-4 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow flex items-center gap-2">
      <span className="text-2xl">💎</span>
      <span className="font-bold">{diamantes}</span>
    </div>
  );
}