import Products from "./components/products/Products";
import "./index.css";
function App() {
  return (
    <div
      className="w-full h-full flex flex-col justify-center 
      items-center pt-4 pb-4 pl-2 pr-2"
    >
      <h1 className="text-2xl">Tables app</h1>
      <Products />
    </div>
  );
}

export default App;
