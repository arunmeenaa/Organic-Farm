import { Link } from "react-router-dom";
import {
  Tractor,
  User,
  MapPin,
} from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

    .fd-card { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    .fd-display { font-family: 'Space Grotesk', ui-sans-serif, sans-serif; }
    .fd-mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }

    .fd-machine-card{
      background:rgba(255,255,255,.78);
      backdrop-filter:blur(12px);
      border:1px solid rgba(255,255,255,.6);
      transition:.25s;
    }

    .fd-machine-card:hover{
      transform:translateY(-4px);
      box-shadow:0 20px 36px -18px rgba(6,95,70,.35);
    }

    .fd-machine-media{
      overflow:hidden;
    }

    .fd-machine-media img{
      transition:.4s;
    }

    .fd-machine-card:hover .fd-machine-media img{
      transform:scale(1.05);
    }

    .fd-chip{
      background:#dcfce7;
      color:#166534;
    }

    .fd-btn{
      background:linear-gradient(90deg,#059669,#84CC16);
      color:#063527;
    }

    .fd-btn:hover{
      box-shadow:0 10px 20px -10px rgba(5,150,105,.5);
    }
  `}</style>
);

const MachineCard = ({ machine }) => {
  console.log(machine);
  return (
    <div className="fd-card fd-machine-card rounded-2xl overflow-hidden">

      <FontImport />

      <div className="fd-machine-media h-56">

        <img
          src={
            machine.images?.[0] ||
            "https://placehold.co/600x400?text=No+Image"
          }
          alt={machine.name}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="p-5">

        <div className="flex justify-between">

          <span className="fd-chip text-xs px-3 py-1 rounded-full font-medium">
            {machine.category}
          </span>

          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              machine.rentalType === "with_operator"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {machine.rentalType === "with_operator"
              ? "Operator Included"
              : "Machine Only"}
          </span>

        </div>

        <h2
          className="text-xl font-semibold mt-4"
          style={{ color: "#0F2E22" }}
        >
          {machine.name}
        </h2>

        <div className="flex items-center gap-2 mt-3 text-gray-600">

          <User size={16} />

          {machine.owner?.name}

        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-600">

          <MapPin size={16} />

          {machine.location?.district},{" "}
          {machine.location?.state}

        </div>

        <div className="flex justify-between items-center mt-6">

          <h3 className="fd-display text-2xl font-semibold text-green-700">

            ₹{machine.price}

            <span className="text-sm text-gray-500">

              /{machine.pricingType.replace("per_","")}

            </span>

          </h3>

          <span
            className={`fd-mono text-sm font-medium ${
              machine.availabilityStatus === "available"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {machine.availabilityStatus}
          </span>

        </div>

        <Link
          to={`/machines/${machine._id}`}
          className="fd-btn mt-6 w-full rounded-xl py-3 flex justify-center items-center gap-2 font-medium"
        >

          <Tractor size={18} />

          View Details

        </Link>

      </div>

    </div>
  );
};

export default MachineCard;