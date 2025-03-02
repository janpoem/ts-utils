export type DirectorySeparator = '/' | '\\';
export type PathInput = string | undefined | null;

export const UnixDS = '/';
export const WinDS = '\\';

export type PathReplacementCallback = (
  path: string,
  separator: string,
) => string;

export type PathUtilsOptions = {
  separator: string;
  dangerReplace?: PathReplacementCallback;
  duplicateReplace?: PathReplacementCallback;
};

/**
 * 创建路径处理工具
 *
 * @param {PathUtilsOptions} options
 * @returns
 */
export const createPathUtils = ({
  separator: inputSeparator,
  dangerReplace,
  duplicateReplace,
}: PathUtilsOptions) => {
  const separator = !inputSeparator
    ? UnixDS
    : inputSeparator.length > 1
      ? inputSeparator.slice(0, 1)
      : inputSeparator;

  const purgePath = (path: PathInput) => {
    let _path = path == null ? '' : path.trim();
    if (_path === '') return '';

    if (dangerReplace != null) {
      _path = dangerReplace(_path, separator);
    }

    if (duplicateReplace != null) {
      _path = duplicateReplace(_path, separator);
    }

    // remove leading and trailing separators
    if (_path.startsWith(separator)) {
      _path = _path.substring(1);
    }
    if (_path.endsWith(separator)) {
      _path = _path.substring(0, _path.length - 1);
    }

    return _path;
  };

  const joinPath = (...paths: PathInput[]) => {
    let parts: string[] = [];

    const handlePart = (input: string) => {
      const part = purgePath(input);
      if (part === '' || part === '.') return;

      if (part.includes(separator)) {
        const _parts = part.split(separator);
        for (const _part of _parts) {
          handlePart(_part);
        }
        return;
      }

      if (part === '..') {
        if (parts.length > 0 && parts[parts.length - 1] !== '..') {
          parts = parts.slice(0, -1);
          return;
        }
      }

      parts.push(part);
    };

    for (const path of paths) {
      if (path == null || path === '') continue;
      handlePart(path);
    }

    return parts.join(separator);
  };

  return {
    purgePath,
    joinPath,
  };
};

export const {
  /**
   * 清除 http 路径中的危险字符和多余的路径分隔符
   *
   * @param {PathInput} path 输入的路径
   * @returns {string} 清除后的路径
   */
  purgePath: purgeHttpPath,
  /**
   * 连接多个路径，当 '..' 超过最大路径时（顶部）时，会保留下来。
   *
   * ```ts
   * console.log(joinHttpPath('a', 'b', 'c', '../../../../../..', 'd', '../../..', 'e'));
   * // => '../../../../../e'
   * ```
   *
   * @param {...PathInput} paths 输入的路径
   * @returns {string} 连接后的路径
   */
  joinPath: joinHttpPath,
} = createPathUtils({
  separator: UnixDS,
  dangerReplace: (path, separator) => {
    return path.includes(WinDS) ? path.replaceAll(WinDS, separator) : path;
  },
  duplicateReplace: (path, separator) => path.replace(/\/{2,}/gm, separator),
});
