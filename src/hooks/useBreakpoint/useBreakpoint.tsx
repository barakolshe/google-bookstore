import { Breakpoint, useTheme } from "@mui/material";
import useWindowDimensions from "../useWindowDimensions/useWindowDimensions";

/**
 * Take a list of breakpoint names as input and provide the name of the
 * current breakpoint from that list as output.
 * @param {Array<Breakpoint>} targetBreakpoints - ["xs" | "sm" | "md" | "lg" | "xl"]
 * @return {string} The current screen breakpoint
 */
const useBreakpoint = (targetBreakpoints: Array<Breakpoint>) => {
  // Verifting input
  if (targetBreakpoints.length === 0) {
    return null;
  }

  const { width } = useWindowDimensions();

  const breakpoints = useTheme().breakpoints.values;
  const filteredBreakpoints = Object.fromEntries(
    Object.entries(breakpoints).filter(([key]) =>
      targetBreakpoints.includes(key as Breakpoint)
    )
  );

  let maxBreakpoint = Object.keys(filteredBreakpoints)[0];
  for (let currBreakpoint in filteredBreakpoints) {
    if (
      filteredBreakpoints.hasOwnProperty(currBreakpoint) &&
      filteredBreakpoints[currBreakpoint] < width
    ) {
      maxBreakpoint = currBreakpoint;
    }
  }
  return maxBreakpoint;
};

export default useBreakpoint;
