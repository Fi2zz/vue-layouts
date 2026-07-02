/**
 * 安全工具模块
 * 提供 XSS 防护、输入验证、输出编码等安全功能
 */

/**
 * CSS filter 白名单
 * 仅允许安全的 CSS filter 函数
 */
const ALLOWED_CSS_FILTERS = [
  'blur',
  'brightness',
  'contrast',
  'grayscale',
  'hue-rotate',
  'invert',
  'opacity',
  'saturate',
  'sepia',
];

/**
 * 验证 CSS filter 是否安全
 * @param filter CSS filter 字符串
 * @returns 是否安全
 */
export function isValidCssFilter(filter: string): boolean {
  if (!filter || typeof filter !== 'string') {
    return false;
  }

  // 移除空白字符
  const normalizedFilter = filter.trim();

  // 检查是否包含危险字符
  if (/[;:{}()'"`\\]/.test(normalizedFilter.replace(/[(),.\s\d%-]/g, ''))) {
    return false;
  }

  // 检查是否以允许的 filter 函数开头
  return ALLOWED_CSS_FILTERS.some(name => 
    normalizedFilter.startsWith(`${name}(`)
  );
}

/**
 * 清理 CSS filter 字符串
 * 移除潜在的恶意代码
 * @param filter 原始 filter 字符串
 * @returns 清理后的字符串，如果无效则返回空字符串
 */
export function sanitizeCssFilter(filter: string): string {
  if (!filter || typeof filter !== 'string') {
    return '';
  }

  const normalizedFilter = filter.trim();

  // 移除所有潜在的危险字符和关键字
  const dangerousPatterns = [
    /javascript:/gi,
    /expression\s*\(/gi,
    /url\s*\(/gi,
    /import\s+/gi,
    /behavior\s*:/gi,
    /binding\s*:/gi,
    /@import/gi,
    /<\s*script/gi,
    /<\s*\/\s*script/gi,
    /<\s*iframe/gi,
    /<\s*object/gi,
    /<\s*embed/gi,
    /on\w+\s*=/gi,  // onclick=, onload=, etc.
  ];

  let sanitized = normalizedFilter;
  for (const pattern of dangerousPatterns) {
    sanitized = sanitized.replace(pattern, '');
  }

  // 验证是否为合法的 CSS filter
  if (!isValidCssFilter(sanitized)) {
    console.warn('[Security] Blocked potentially dangerous CSS filter:', filter);
    return '';
  }

  return sanitized;
}

/**
 * 安全的图片源类型白名单
 */
const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/svg+xml',
  'image/avif',
];

/**
 * 验证 data URL 是否安全
 * @param src 图片源字符串
 * @returns 是否安全
 */
export function isSafeDataUrl(src: string): boolean {
  if (!src.startsWith('data:')) {
    return true; // 非 data URL 交给其他验证
  }

  // 检查是否为允许的图片类型
  const isValidType = ALLOWED_IMAGE_TYPES.some(type => 
    src.toLowerCase().startsWith(`data:${type}`)
  );

  if (!isValidType) {
    console.warn('[Security] Blocked potentially dangerous data URL:', src.substring(0, 100));
    return false;
  }

  // 检查是否包含危险内容（SVG 中的 script 等）
  if (src.includes('<script') || src.includes('onload=')) {
    console.warn('[Security] Blocked SVG with script:', src.substring(0, 100));
    return false;
  }

  return true;
}

/**
 * 清理和验证图片源
 * @param src 原始图片源
 * @returns 清理后的图片源，如果不安全则返回空字符串
 */
export function sanitizeImageSrc(src: string): string {
  if (!src || typeof src !== 'string') {
    return '';
  }

  const trimmedSrc = src.trim();

  // 验证 data URL
  if (trimmedSrc.startsWith('data:') && !isSafeDataUrl(trimmedSrc)) {
    return '';
  }

  // 检查是否包含危险的协议
  const dangerousProtocols = [
    'javascript:',
    'vbscript:',
    'data:text/html',
    'data:application',
  ];

  const lowerSrc = trimmedSrc.toLowerCase();
  if (dangerousProtocols.some(proto => lowerSrc.startsWith(proto))) {
    console.warn('[Security] Blocked dangerous protocol:', trimmedSrc.substring(0, 100));
    return '';
  }

  return trimmedSrc;
}

/**
 * 验证 CSS 颜色值是否安全
 * @param color 颜色字符串
 * @returns 是否安全
 */
export function isValidCssColor(color: string): boolean {
  if (!color || typeof color !== 'string') {
    return false;
  }

  const normalizedColor = color.trim().toLowerCase();

  // 检查是否包含危险内容
  if (normalizedColor.includes('url(') || 
      normalizedColor.includes('expression(') ||
      normalizedColor.includes('javascript:')) {
    return false;
  }

  // 允许的颜色格式
  const validColorPatterns = [
    /^#[0-9a-f]{3,8}$/i,  // Hex
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,  // RGB
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,  // RGBA
    /^hsl\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*\)$/,  // HSL
    /^hsla\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*,\s*[\d.]+\s*\)$/,  // HSLA
    /^[a-z]+$/,  // 颜色名称（如 red, blue 等）
  ];

  return validColorPatterns.some(pattern => pattern.test(normalizedColor));
}

/**
 * 清理 CSS 颜色值
 * @param color 原始颜色字符串
 * @returns 清理后的颜色值，如果无效则返回 undefined
 */
export function sanitizeCssColor(color: string): string | undefined {
  if (!color || typeof color !== 'string') {
    return undefined;
  }

  const sanitized = color.trim();

  if (isValidCssColor(sanitized)) {
    return sanitized;
  }

  console.warn('[Security] Blocked invalid color value:', color);
  return undefined;
}

/**
 * 验证 CSS 渐变是否安全
 * @param gradient CSS 渐变字符串
 * @returns 是否安全
 */
export function isValidCssGradient(gradient: string): boolean {
  if (!gradient || typeof gradient !== 'string') {
    return false;
  }

  const normalizedGradient = gradient.trim();

  // 检查是否包含危险内容
  if (normalizedGradient.includes('url(') ||
      normalizedGradient.includes('expression(') ||
      normalizedGradient.includes('javascript:')) {
    return false;
  }

  // 允许的渐变类型
  const validGradientPatterns = [
    /^linear-gradient\s*\(/,
    /^radial-gradient\s*\(/,
    /^conic-gradient\s*\(/,
    /^repeating-linear-gradient\s*\(/,
    /^repeating-radial-gradient\s*\(/,
  ];

  return validGradientPatterns.some(pattern => pattern.test(normalizedGradient));
}

/**
 * 清理 CSS 渐变
 * @param gradient 原始渐变字符串
 * @returns 清理后的渐变，如果无效则返回空字符串
 */
export function sanitizeCssGradient(gradient: string): string {
  if (!gradient || typeof gradient !== 'string') {
    return '';
  }

  const sanitized = gradient.trim();

  if (isValidCssGradient(sanitized)) {
    return sanitized;
  }

  console.warn('[Security] Blocked invalid gradient:', gradient);
  return '';
}
