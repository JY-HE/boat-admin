/**
 * 获取图片路径
 * @param imgName assets/img/ 下的图片名称
 * @returns 图片的路径
 */
const images = import.meta.glob('@/assets/img/*', { eager: true });

export const getAssetsImg = (imgName: string) => {
    const imgPath = `/src/assets/img/${imgName}`;
    if (imgPath in images) {
        return (images[imgPath] as any).default;
    } else {
        throw new Error(`Image ${imgName} not found`);
    }
};
