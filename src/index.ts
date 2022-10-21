import { useMemo, useEffect } from "react";
import * as ackeeTracker from "ackee-tracker";

const isBrowser = typeof window !== "undefined";

/**
 * Use Ackee in React.
 * Creates an instance once and a new record every time the pathname changes.
 * Safely no-ops during server-side rendering.
 * @param {String} pathname - Current path.
 * @param {Object} environment - Object containing the URL of the Ackee server and the domain id.
 * @param {ackeeTracker.TrackingOptions} options - Ackee options.
 * @returns {Object} { action, updateAction, updateRecord }
 */
const useAckee = (
  pathname: string,
  environment: { server: string; domainId: string },
  options: ackeeTracker.TrackingOptions = {}
) => {
  const ackeeInstance = useMemo(() => {
    if (isBrowser === false) return;

    return ackeeTracker.create(environment.server, options);
  }, [
    environment.server,
    options.detailed,
    options.ignoreLocalhost,
    options.ignoreOwnVisits,
  ]);

  useEffect(() => {
    if (!ackeeInstance) {
      console.warn(
        "Skipped record creation because useAckee has been called in a non-browser environment"
      );
      return;
    }

    if (!pathname.length) {
      console.warn(
        "Skipped record creation because useAckee has been called without pathname"
      );
      return;
    }

    const attributes = ackeeTracker.attributes(options.detailed);
    const url = new URL(pathname, location.toString());

    return ackeeInstance.record(environment.domainId, {
      ...attributes,
      siteLocation: url.href,
    }).stop;
  }, [ackeeInstance, pathname, environment.domainId]);

  if (!ackeeInstance) {
    console.warn(
      "AckeeInstance was unable to be created. Actions are unable to be returned."
    );
    return;
  }

  /**
   * Create a new action using an event id.
   * @typedef {Function} AckeeAction
   * @param eventId string
   * @param attributes ActionAttributes
   * @param callback
   * @returns void
   */
  const action = (
    eventId: string,
    attributes: ackeeTracker.ActionAttributes,
    callback?: (actionId: string) => void
  ) => ackeeInstance.action(eventId, attributes, callback);

  /**
   * Update an existing action with the given attributes
   * @typedef {Function} AckeeUpdateAction
   * @param actionId string
   * @param attributes ActionAttributes
   * @returns void
   */
  const updateAction = (
    actionId: string,
    attributes: ackeeTracker.ActionAttributes
  ) => ackeeInstance.updateAction(actionId, attributes);

  /**
   * Update the record for the current ackee instance.
   * @typedef {Function} AckeeUpdateRecord
   * @param recordId
   * @returns void
   */
  const updateRecord = (recordId: string) =>
    ackeeInstance.updateRecord(recordId);

  return { action, updateAction, updateRecord };
};

export default useAckee;
