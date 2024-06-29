import LanguageSwitcher from "./common/LanguageSwitcher";
import ReduxTodo from "./components/ReduxTodo";
import Todo from "./components/Todo";
import ZustandTodo from "./components/ZustandTodo";

function App() {
  return (
    <>
    <div className="bg-blue-500 flex items-center justify-between px-10">
      <p className="font-bold p-4 text-white text-5xl">Todo</p>
      <LanguageSwitcher/>
    </div>
      <Todo />;
      <ReduxTodo />
      <ZustandTodo />
    </>
  );
}

export default App;
