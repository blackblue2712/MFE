import { add } from "./add";

describe("app2 add", () => {
    it("should success return a + b", () => {
        expect(add(1, 2)).toBe(3)
    })
})