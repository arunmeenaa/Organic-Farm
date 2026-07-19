import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, Wrench } from "lucide-react";
import toast from "react-hot-toast";
import { getMachines } from "../../services/machine.service";
import MachineCard from "../../components/machine/MachineCard";
import { machineCategories, EmptyBox } from "./MarketplaceUtils";

const MachineryTab = ({ darkMode }) => {
  const [machines, setMachines] = useState([]);
  const [machineSearch, setMachineSearch] = useState("");
  const [machineCategory, setMachineCategory] = useState("All");
  const [rentalType, setRentalType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        setLoading(true);
        const { data } = await getMachines();
        setMachines(data.machines || []);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to load machines");
      } finally {
        setLoading(false);
      }
    };
    fetchMachines();
  }, []);

  const filteredMachines = useMemo(
    () => machines.filter((m) => {
      const ms = m.name?.toLowerCase().includes(machineSearch.toLowerCase());
      const mc = machineCategory === "All" || m.category === machineCategory;
      const mr = rentalType === "all" || m.rentalType === rentalType;
      return ms && mc && mr;
    }),
    [machines, machineSearch, machineCategory, rentalType],
  );

  const inputCls = [
    "w-full rounded-xl py-3 px-4 text-sm font-medium outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] placeholder:text-[rgba(167,243,208,0.35)] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] placeholder:text-[rgba(6,95,70,0.30)] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  const selectInputCls = [
    "rounded-xl px-4 py-3 text-sm font-semibold cursor-pointer w-full outline-none transition-[border-color,box-shadow] duration-150",
    darkMode
      ? "bg-white/[0.06] border border-[rgba(52,211,153,0.15)] text-[#D1FAE5] focus:border-[#34D399] focus:shadow-[0_0_0_3px_rgba(52,211,153,0.14)] [&>option]:bg-[#0B1A12] [&>option]:text-[#D1FAE5]"
      : "bg-white/[0.88] border border-[rgba(6,95,70,0.12)] text-[#064E3B] focus:border-[#059669] focus:shadow-[0_0_0_3px_rgba(5,150,105,0.14)]",
  ].join(" ");

  return (
    <>
      <div className={["p-5 rounded-2xl mb-8 backdrop-blur-[20px]", darkMode ? "bg-white/[0.05] border border-[rgba(52,211,153,0.10)] shadow-[0_12px_30px_-12px_rgba(0,0,0,0.40)]" : "bg-white/50 border border-white/60 shadow-[0_12px_30px_-18px_rgba(5,150,105,0.30)]"].join(" ")}>
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={18} className="text-amber-500" />
          <h2 className={["font-bold text-sm uppercase tracking-wider", darkMode ? "text-[#D1FAE5]" : "text-[#1A3D2B]"].join(" ")}>Search Filters</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search size={16} className={["absolute left-4 top-1/2 -translate-y-1/2", darkMode ? "text-[rgba(52,211,153,0.40)]" : "text-[rgba(6,95,70,0.35)]"].join(" ")} />
            <input type="text" placeholder="Search fleet listings..." value={machineSearch} onChange={(e) => setMachineSearch(e.target.value)} className={`${inputCls} pl-11`} />
          </div>
          <select value={machineCategory} onChange={(e) => setMachineCategory(e.target.value)} className={selectInputCls}>
            {machineCategories.map((c) => <option key={c} value={c}>{c === "All" ? "All Equipment" : c}</option>)}
          </select>
          <select value={rentalType} onChange={(e) => setRentalType(e.target.value)} className={selectInputCls}>
            <option value="all">All Service Frameworks</option>
            <option value="machine_only">Machine Only</option>
            <option value="with_operator">With Operator</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={["p-4 flex flex-col justify-between h-[320px] animate-pulse rounded-3xl", darkMode ? "bg-white/[0.05] border border-[rgba(52,211,153,0.08)]" : "bg-white/[0.72] border border-white/60"].join(" ")}>
              <div className={["h-40 w-full rounded-lg", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
              <div className={["mt-4 h-4 w-3/4 rounded-lg", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
              <div className={["h-10 w-full mt-4 rounded-xl", darkMode ? "bg-[rgba(52,211,153,0.08)]" : "bg-[rgba(6,95,70,0.06)]"].join(" ")} />
            </div>
          ))}
        </div>
      ) : filteredMachines.length === 0 ? (
        <EmptyBox darkMode={darkMode} icon={<Wrench size={28} />} title="No Machinery Found" sub="No machines match the current filters." amber />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMachines.map((m) => <MachineCard key={m._id} machine={m} />)}
        </div>
      )}
    </>
  );
};

export default MachineryTab;