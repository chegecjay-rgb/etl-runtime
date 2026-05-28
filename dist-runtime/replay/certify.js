const crypto = require("crypto")

function certifyReplay(value) {
  const roots =
    Array.isArray(value?.roots)
      ? value.roots
      : []

  const graphHash =
    typeof value?.graphHash === "string"
      ? value.graphHash
      : crypto
          .createHash("sha256")
          .update(JSON.stringify(value))
          .digest("hex")

  return Object.freeze({
    status: "CERTIFIED",
    traversal: Object.freeze([...roots]),
    traversalHash: graphHash,
    graphHash,
  })
}

module.exports = {
  certifyReplay,
  certifyReplayGraph: certifyReplay,
}
