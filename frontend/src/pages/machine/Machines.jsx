import { useEffect, useMemo, useState } from "react";
import { Search, Filter } from "lucide-react";
import { notify } from "../../utils/toast";
import { getMachines } from "../../services/machine.service";
import MachineCard from "../../components/machine/MachineCard";

const categories = [
  "All",
  "Tractor",
  "Harvester",
  "Rotavator",
  "Cultivator",
  "Seeder",
  "Sprayer",
  "Drone",
];

export default function Machines() {
  const [machines, setMachines] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [rentalType, setRentalType] = useState("all");

  useEffect(() => {
    fetchMachines();
  }, []);

  const fetchMachines = async () => {
    try {
      setLoading(true);

      const { data } = await getMachines();

      setMachines(data.machines);
    } catch (err) {
      console.error(err);
      notify.error("Failed to fetch machines");
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return machines.filter((m) => {
      const matchesSearch = m.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = category === "All" || m.category === category;

      const matchesRental = rentalType === "all" || m.rentalType === rentalType;

      return matchesSearch && matchesCategory && matchesRental;
    });
  }, [machines, search, category, rentalType]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Farm Machinery</h1>
          <p className="text-gray-500 mt-2">
            Book tractors, harvesters and other farm equipment.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5 mb-8">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3.5 text-gray-400"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search machines..."
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <select
              value={rentalType}
              onChange={(e) => setRentalType(e.target.value)}
              className="border rounded-xl px-4 py-3"
            >
              <option value="all">All Rental Types</option>
              <option value="machine_only">Machine Only</option>
              <option value="with_operator">With Operator</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-5 text-gray-600">
          <Filter size={18} />
          <span>{filtered.length} machine(s) found</span>
        </div>

        {loading ? (
          <div className="text-center py-20 text-lg">Loading machines...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-16 text-center">
            <h2 className="text-2xl font-semibold">No Machines Found</h2>
            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {filtered.map((machine) => (
              <MachineCard key={machine._id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
