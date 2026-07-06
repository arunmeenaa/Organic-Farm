import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Plus, Tractor } from "lucide-react";

import { getMyMachines, deleteMachine } from "../../services/machine.service";

import MachineCard from "../../components/machine/MachineCard";

import { notify } from "../../utils/toast";

const MyMachines = () => {
  const [machines, setMachines] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchMachines = async () => {
    try {
      const { data } = await getMyMachines();

      setMachines(data.machines);
    } catch (err) {
      notify.error(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this machine?")) return;

    try {
      await deleteMachine(id);

      notify.success("Machine deleted successfully");

      setMachines((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      notify.error(err.response?.data?.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto py-10 px-5">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold">My Machines</h1>

            <p className="text-gray-500 mt-2">Manage your rental machines.</p>
          </div>

          <Link
            to="/farmer/machines/add"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Add Machine
          </Link>
        </div>

        {machines.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <Tractor size={60} className="mx-auto text-green-600" />

            <h2 className="text-2xl font-bold mt-5">No Machines Listed</h2>

            <p className="text-gray-500 mt-2">
              Start earning by renting your farm equipment.
            </p>

            <Link
              to="/farmer/machines/add"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-xl"
            >
              Add Machine
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {machines.map((machine) => (
              <MachineCard key={machine._id} machine={machine} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMachines;
