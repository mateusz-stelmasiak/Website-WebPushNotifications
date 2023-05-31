
self.addEventListener("push", async (e) => {
    const data = await e.data.json()
    await self.registration.showNotification(data.title, {
        body:data.body,
    })
});