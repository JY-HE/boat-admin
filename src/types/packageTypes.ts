/**
 * package.json 文件的类型定义
 * @param name 项目名称
 * @param version 版本号
 * @param dependencies 生产环境依赖
 * @param devDependencies 开发环境依赖
 * @param any 其他
 */
export interface PackageJson {
    name: string;
    version: string;
    dependencies: { [key: string]: string };
    devDependencies: { [key: string]: string };
    [key: string]: { [key: string]: string } | string | boolean | number;
}
