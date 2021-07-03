export interface Book {
    idBook?: number | null ,
    title: Text,
    author: Text,
    pages: number,
    Bookshelf_idBookshelf: number | null,
    toRead: number,
    stars: number,
    photo?: Text
}
