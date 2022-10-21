import * as ackeeTracker from "ackee-tracker";
/**
 * Use Ackee in React.
 * Creates an instance once and a new record every time the pathname changes.
 * Safely no-ops during server-side rendering.
 * @param {String} pathname - Current path.
 * @param {Object} environment - Object containing the URL of the Ackee server and the domain id.
 * @param {ackeeTracker.TrackingOptions} options - Ackee options.
 */
export declare const useAckee: (pathname: string, environment: {
    server: string;
    domainId: string;
}, options?: ackeeTracker.TrackingOptions) => (((eventId: string, attributes: ackeeTracker.ActionAttributes, callback?: ((actionId: string) => void) | undefined) => void | undefined) | ((recordId: string) => ackeeTracker.AckeeTrackingReturn | undefined))[];
export default useAckee;
