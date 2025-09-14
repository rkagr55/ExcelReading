export async function attachScreenshot(page, testInfo) {
    const screenshot = await page.screenshot();
    await testInfo.attach(`${testInfo.title}_${Date().toLocaleString()}`, { body: screenshot, contentType: 'image/png' });

}