interface Book {
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

interface BooksResponse {
  totalItems: number;
  items: Book[];
}
