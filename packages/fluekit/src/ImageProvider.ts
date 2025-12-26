const IMAGE_PROVIDER_SYMBOL = Symbol("ImageProvider");

export interface ImageProvider {
  src: string;
  scale?: number;
  [IMAGE_PROVIDER_SYMBOL]: true;
}

export function isImageProvider(value: any): value is ImageProvider {
  return value && value[IMAGE_PROVIDER_SYMBOL] === true;
}

export interface NetworkImageOptions {
  scale?: number;
  headers?: Record<string, string>;
}

export function NetworkImage(url: string, options: NetworkImageOptions = {}): ImageProvider {
  return {
    src: url,
    scale: options.scale ?? 1.0,
    [IMAGE_PROVIDER_SYMBOL]: true,
  };
}

export interface AssetImageOptions {
  package?: string;
  bundle?: any;
}

/**
 * 加载本地资源图片
 * 注意：在 Vite 环境下，通常需要使用 new URL('./path', import.meta.url).href 或 import 导入图片
 * 这里 AssetImage 接收的 name 应该是处理后的 URL 或者是相对于 public 的路径
 */
export function AssetImage(name: string, options: AssetImageOptions = {}): ImageProvider {
  // 简单的路径处理，实际项目中可能需要根据构建工具调整
  // 如果提供了 package，可能需要特殊的路径前缀
  const src = options.package ? `packages/${options.package}/${name}` : name;

  return {
    src,
    scale: 1.0,
    [IMAGE_PROVIDER_SYMBOL]: true,
  };
}
