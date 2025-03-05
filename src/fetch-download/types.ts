export type DownloadUrl = string | URL;

export type DownloadRequest = {
  url: DownloadUrl;
} & RequestInit;

export type DownloadInput =
  | DownloadUrl
  | DownloadRequest
  | Request
  | Promise<Response>;

export type DownloadFetchCallback = () => Promise<Response>;
