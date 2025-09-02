export interface Response<T> {
  data: T[];
  meta: {
    total: number;
  };
}

export interface SingleResponse<T> {
  data: T;
}

export interface MessageResponse {
  message: string;
}