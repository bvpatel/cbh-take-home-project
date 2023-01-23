const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {

  beforeEach(() => {
    crypto.createHash = jest.fn().mockReturnValue({
      update: jest.fn().mockReturnValue({
        digest: jest.fn().mockReturnValue("mocked_hash")
      })
    });
  });

  it("returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("hashes event data when partition key is not provided", () => {
    const event = { data: "test data" };
    deterministicPartitionKey(event);
    expect(crypto.createHash).toHaveBeenCalledWith("sha3-512");
  });

  it("returns trivial partition key when event is not provided", () => {
    const partitionKey = deterministicPartitionKey();
    expect(partitionKey).toBe("0");
  });

  it("returns partition key from event when provided", () => {
    const event = { partitionKey: "123" };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe("123");
  });

  it("truncates partition key if longer than max length", () => {
    const longKey = "a".repeat(257);
    const event = { partitionKey: longKey };
    crypto.createHash = jest.fn().mockReturnValue({
      update: jest.fn().mockReturnValue({
        digest: jest.fn().mockReturnValue("a".repeat(256))
      })
    });
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe("a".repeat(256));
    expect(partitionKey.length).toBe(256);
  });

  it("returns stringified partition key if it's not a string", () => {
    const event = { partitionKey: { id: 1 } };
    const partitionKey = deterministicPartitionKey(event);
    expect(partitionKey).toBe(JSON.stringify({ id: 1 }));
  });
});