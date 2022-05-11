import { useEffect } from "react";
import { useGetClassify } from "./store/action";

function App(props) {
  const getClassify = useGetClassify()

  useEffect(() => {
    getClassify()
  }, [])
  return (
    <>
      { props.children }
    </>
  );
}

export default App; 