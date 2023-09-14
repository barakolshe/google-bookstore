class Breakpoint {
  currBreakpoint: string;
  allBreakpoints: string[];

  constructor(currBreakpoint: string, allBreakpoints: string[]) {
    this.currBreakpoint = currBreakpoint;
    this.allBreakpoints = allBreakpoints;
  }

  set(currBreakpoint: string) {
    this.currBreakpoint = currBreakpoint;
  }

  bigger(relativeBreakpoint: string) {
    const currBreakpointIndex = this.allBreakpoints.findIndex(
      (breakpoint) => breakpoint === this.currBreakpoint
    );
  }
}
