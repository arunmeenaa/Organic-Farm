import MachineForm from "../../components/machine/MachineForm";

const AddMachine = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <MachineForm mode="create" />
    </div>
  );
};

export default AddMachine;