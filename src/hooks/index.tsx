import { AppState } from "flux/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;

export function useAppState() {
  return useAppSelector((state) => state);
}
