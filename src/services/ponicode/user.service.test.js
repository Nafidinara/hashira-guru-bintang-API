const user_service = require("../user.service")
// @ponicode
describe("user_service.createUser", () => {
    test("0", async () => {
        await user_service.createUser({ email: "ponicode.com" })
    })

    test("1", async () => {
        await user_service.createUser({ email: "something@example.com" })
    })

    test("2", async () => {
        await user_service.createUser({ email: "something.example.com" })
    })

    test("3", async () => {
        await user_service.createUser({ email: "TestUpperCase@Example.com" })
    })

    test("4", async () => {
        await user_service.createUser({ email: "email@Google.com" })
    })

    test("5", async () => {
        await user_service.createUser({ email: "" })
    })
})
