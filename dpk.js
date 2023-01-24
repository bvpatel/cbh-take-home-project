const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const ALGORITHM = "sha3-512";
  const DIGEST = "hex";
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash(ALGORITHM).update(data).digest(DIGEST);
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash(ALGORITHM).update(candidate).digest(DIGEST);
  }
  return candidate;
};