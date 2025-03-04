export type DownloadUrl = string | URL;

export type DownloadRequest = {
  url: DownloadUrl;
} & RequestInit;

export type DownloadInput =
  | DownloadUrl
  | DownloadRequest
  | Request
  | Promise<Response>;

export type DownloadProcessCallback<T> = (it: T) => void | Promise<void>;

export type DownloadProcessOptions<T> = {
  isNotThrow?: boolean;
  onFetch?: DownloadProcessCallback<T>;
  onHeaders?: DownloadProcessCallback<T>;
  onProgress?: DownloadProcessCallback<T>;
  onComplete?: DownloadProcessCallback<T>;
  onError?: DownloadProcessCallback<T>;
};

export interface DownloadProcessImpl {
  read(
    opts: DownloadProcessCallback<this> | DownloadProcessOptions<this>,
  ): Promise<this>;

  newErr(msg: string): Error;
}

export type DownloadFetchCallback = () => Promise<Response>;
