/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as React from "react"
import {
  stubbedPublicClientApplication,
  Logger,
  InteractionStatus
} from "@azure/msal-browser"

/*
 * Stubbed context implementation
 * Only used when there is no provider, which is an unsupported scenario
 */
const defaultMsalContext = {
  instance: stubbedPublicClientApplication,
  inProgress: InteractionStatus.None,
  accounts: [],
  logger: new Logger({})
}

export const MsalContext = React.createContext(defaultMsalContext)
export const MsalConsumer = MsalContext.Consumer
