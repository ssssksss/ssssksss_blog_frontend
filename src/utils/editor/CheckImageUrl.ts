function checkImageLoaded(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true); // 이미지가 성공적으로 로드됨
    img.onerror = () => resolve(false); // 이미지 로드 실패
    img.src = url;
  });
}

export async function waitForImage(
  url: string,
  maxAttempts = 15,
  delay = 1000,
): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    const loaded = await checkImageLoaded(url);
    if (loaded) return true;
    await new Promise((r) => setTimeout(r, delay));
  }
  return false;
}
