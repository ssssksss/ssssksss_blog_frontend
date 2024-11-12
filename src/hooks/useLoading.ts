import {useState} from "react";

function useLoading(initState?: boolean) {
  const [loading, setLoading] = useState(initState || false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return {loading, startLoading, stopLoading};
}

export default useLoading;
