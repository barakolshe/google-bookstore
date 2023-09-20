export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export interface BooksResponse {
  totalItems: number;
  items: Book[];
}
