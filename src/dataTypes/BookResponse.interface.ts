interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    categories?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    language?: string;
  };
}

interface BooksResponse {
  totalItems: number;
  items: Book[];
}
