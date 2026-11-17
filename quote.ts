type Booking = {
  startMinutes: number;
  durationMinutes: number;
  addEquipment: boolean;
};

type Interval = { start: number; end: number };

// Fictional rates in cents and fixture times in minutes from the booking day's midnight.
const roomRatePerHour = 7200;
const equipmentFee = 2500;
const opensAt = 8 * 60;
const closesAt = 26 * 60;
const turnaroundMinutes = 30;

export function quoteBooking(booking: Booking, busy: readonly Interval[]) {
  const { startMinutes, durationMinutes, addEquipment } = booking;
  if (
    !Number.isInteger(startMinutes) || startMinutes % 30 !== 0 ||
    !Number.isInteger(durationMinutes) || durationMinutes % 30 !== 0 ||
    durationMinutes < 60 || startMinutes < opensAt ||
    startMinutes + durationMinutes > closesAt ||
    typeof addEquipment !== "boolean"
  ) {
    throw new RangeError("Booking must use half-hour slots within opening hours, with a one-hour minimum.");
  }

  const endMinutes = startMinutes + durationMinutes;
  if (busy.some(({ start, end }) =>
    startMinutes < end + turnaroundMinutes && endMinutes + turnaroundMinutes > start
  )) {
    throw new RangeError("This slot overlaps an existing booking or its turnaround buffer.");
  }

  const roomCents = durationMinutes * roomRatePerHour / 60;
  const equipmentCents = addEquipment ? equipmentFee : 0;
  return { endMinutes, roomCents, equipmentCents, totalCents: roomCents + equipmentCents };
}
