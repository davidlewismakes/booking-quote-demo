import { strict as assert } from "node:assert";
import { test } from "node:test";
import { quoteBooking } from "./quote.ts";

const evening = { startMinutes: 23 * 60, durationMinutes: 150, addEquipment: true };
test("prices a booking ending the next day", () => {
  assert.deepEqual(quoteBooking(evening, []), {
    endMinutes: 25 * 60 + 30, roomCents: 18000, equipmentCents: 2500, totalCents: 20500,
  });
});
test("rejects a booking that goes past closing", () => {
  assert.throws(() => quoteBooking({ ...evening, durationMinutes: 210 }, []), /opening hours/);
});
test("enforces turnaround while allowing bookings at the exact boundary", () => {
  assert.throws(() => quoteBooking(evening, [{ start: 21 * 60, end: 22 * 60 + 45 }]), /overlaps/);
  assert.doesNotThrow(() => quoteBooking(evening, [{ start: 21 * 60, end: 22 * 60 + 30 }]));
});
