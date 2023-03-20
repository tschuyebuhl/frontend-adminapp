import React, { useState, useEffect } from 'react';
import { getVirtualMachines, VirtualMachine } from '../components/VirtualMachine';

export function VirtualMachinesList() {
  const [virtualMachines, setVirtualMachines] = useState<VirtualMachine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVirtualMachines() {
      const data = await getVirtualMachines();
      setLoading(false);
      setVirtualMachines(
        data.map((vm) => ({
          ...vm,
          clickCount: 0, // add a click count state variable to each virtual machine
        })),
      );
    }
    fetchVirtualMachines();
  }, []);

  const handleClick = (vm: VirtualMachine) => {
    const updatedVirtualMachines = virtualMachines.map((v) =>
      v.ID === vm.ID ? { ...v, clickCount: v.clickCount + 1 } : v,
    );
    setVirtualMachines(updatedVirtualMachines);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2
        className={`inline-flex flex-col text-left px-4 py-3
    rounded-md border-1 border-transparent`}
      >
        Virtual Machines
      </h2>
      <ul>
        {virtualMachines.map((vm) => (
          <li key={vm.ID}>
            {vm.VsphereID}, {vm.Name}, click count: {vm.clickCount}
            <button
              className={`inline-flex flex-col text-left px-4 py-3
    rounded-md border-1 border-transparent`}
              onClick={() => handleClick(vm)}
            >
              Edit
            </button>
            <button>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
