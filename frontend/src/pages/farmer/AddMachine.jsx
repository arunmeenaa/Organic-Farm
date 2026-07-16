import MachineForm from "../../components/machine/MachineForm";

const AddMachine = () => {
  return (
    <div className="min-h-screen  py-10 px-4">
      <MachineForm mode="create" />
    </div>
  );
};

export default AddMachine;