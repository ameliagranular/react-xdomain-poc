/**
 * A service that provides access to Zingchart events.
 */

import * as zingchart from 'zingchart';

class ZingChartService {

    private static nodeMouseoverHandlers: any[] = [];
    private static plotMouseoutHandlers: any[] = [];
    private static nodeMouseoutHandlers: any[] = [];

    /* node_mouseover */

    public static onNodeMouseover(f: Function) {
        this.nodeMouseoverHandlers.push(f);
        this.updateNodeMouseover();
    }

    public static clearNodeMouseover(f?: Function) {
        if (f) {
            this.nodeMouseoverHandlers = this.nodeMouseoverHandlers.filter(
                (handler) => handler !== f
            );
        } else {
            this.nodeMouseoverHandlers = [];
            this.updateNodeMouseover();
        }
    }

    /* node_mouseout */

    public static onNodeMouseout(f: Function) {
        this.nodeMouseoutHandlers.push(f);
        this.updateNodeMouseout();
    }

    public static clearNodeMouseout(f?: Function) {
        if (f) {
            this.nodeMouseoutHandlers = this.nodeMouseoutHandlers.filter(
                (handler) => handler !== f
            );
        } else {
            this.nodeMouseoutHandlers = [];
            this.updateNodeMouseout();
        }
    }

    /* plot_mouseout */

    public static onPlotMouseout(f: Function) {
        this.plotMouseoutHandlers.push(f);
        this.updatePlotMouseout();
    }

    public static clearPlotMouseout(f?: Function) {
        if (f) {
            this.plotMouseoutHandlers = this.plotMouseoutHandlers.filter(
                (handler) => handler !== f
            );
        } else {
            this.plotMouseoutHandlers = [];
            this.updatePlotMouseout();
        }
    }

    /* handler updaters */

    private static updateNodeMouseover() {
        zingchart.node_mouseover = (e: any) => {
            this.nodeMouseoverHandlers.forEach(handler => handler(e));
        };
    }

    private static updateNodeMouseout() {
        zingchart.node_mouseout = (e: any) => {
            this.nodeMouseoutHandlers.forEach(handler => handler(e));
        };
    }

    private static updatePlotMouseout() {
        zingchart.plot_mouseout = (e: any) => {
            this.plotMouseoutHandlers.forEach(handler => handler(e));
        };
    }
}

export { ZingChartService };
