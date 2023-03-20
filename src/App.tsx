import './App.css';
import { VirtualMachinesList } from './pages/VirtualMachinesList';
import { TicketList } from './pages/TicketList';
import { TicketForm } from './components/Form';

function App() {
  return (
    <div className="App">
      <TicketList />
      <VirtualMachinesList />
      <TicketForm />
    </div>
  );
}

export default App;
