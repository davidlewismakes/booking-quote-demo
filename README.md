# Booking quote demo

A standalone TypeScript example inspired by the booking workflow I built for a production space. It validates half-hour slots, checks calendar conflicts plus a turnaround buffer, and calculates an itemized quote in cents. Times are measured from the booking day's midnight, so a 1:30 a.m. finish is represented as minute 1530.

Run with Node 24 or later:

```sh
node --test quote.test.ts
```

All prices and calendar entries are fictional fixtures. In a live booking system, the server should supply calendar availability, recalculate the quote, and check availability again when reserving the slot.
