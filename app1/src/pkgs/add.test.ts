import { add } from "./add";

describe("app1 add", () => {
    it("should success return a + b", () => {
        expect(add(1, 2)).toBe(3)
    })
})