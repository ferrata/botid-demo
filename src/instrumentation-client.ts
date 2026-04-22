import { initBotId } from "botid/client/core";

initBotId({
  protect: [{ path: "/api/test-bot-id", method: "POST" }],
});
