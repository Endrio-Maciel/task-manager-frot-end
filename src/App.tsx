import { TaskList} from './components/Task-list/Task-list';
import { Header } from './components/Header/Header';

export default function App() {
  return (
    <>

        <header>
          <Header />
        </header>

        <main>
        <TaskList />
        </main>
      
    </>
  );
}
