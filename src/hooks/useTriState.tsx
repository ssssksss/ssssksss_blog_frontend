import { useState } from "react";

export const useTriState = (defaultValue: false) => {
    const [state, setState] = useState<boolean>(defaultValue);
    return [state, setState, () => setState((prev)=>!prev)];
}