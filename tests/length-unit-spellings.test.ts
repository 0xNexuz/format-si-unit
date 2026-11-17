import { expect, test } from "bun:test"
import { parseAndConvertSiUnit } from "../index"

test("reads spelled-out inches as millimetres", () => {
  expect(parseAndConvertSiUnit("2 inches")).toEqual({
    parsedUnit: "inches",
    unitOfValue: "mm",
    value: 50.8,
  })
  expect(parseAndConvertSiUnit("0.1 inch").value).toBeCloseTo(2.54)
  expect(parseAndConvertSiUnit("1inch").value).toBeCloseTo(25.4)
})

test("reads plural mils and thou as millimetres", () => {
  expect(parseAndConvertSiUnit("10 mils").value).toBeCloseTo(0.254)
  expect(parseAndConvertSiUnit("8mils").value).toBeCloseTo(0.2032)
  expect(parseAndConvertSiUnit("10 thou").value).toBeCloseTo(0.254)
})

test("keeps the existing short length units", () => {
  expect(parseAndConvertSiUnit("2in").value).toBeCloseTo(50.8)
  expect(parseAndConvertSiUnit("10mil").value).toBeCloseTo(0.254)
  expect(parseAndConvertSiUnit("5ms")).toEqual({
    parsedUnit: "ms",
    unitOfValue: "ms",
    value: 5,
  })
  expect(parseAndConvertSiUnit("2s").value).toBe(2000)
})
