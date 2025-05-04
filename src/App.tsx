import ResizableCard from './compoments/resizable-card';

function App() {
  return (
    <main className='main-wrapper'>
      
      <ResizableCard>
        <h3>My Resizable Card</h3>
        <p>This is some content within the resizable card.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </ResizableCard>
    </main>
  );
}

export default App;
