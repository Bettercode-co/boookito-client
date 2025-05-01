interface Library {
    id: number;
    libraryName: string;
    address: string;
    phoneNumber: string;
    imageSource: string;
}

interface Category {
    id: number;
    categoryName: string;
    createdAt: string;
    libraryId: number;
}

const API_CONFIG = {
    baseURL: 'https://api.boookito.ir/api/v2'
};

export const getLibraries = async (): Promise<Library[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/home/libraries`);
        if (!response.ok) {
            throw new Error('خطا در دریافت اطلاعات کتابخانه‌ها');
        }
        return await response.json();
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کتابخانه‌ها:', error);
        return [];
    }
};

export const getCategories = async (libraryId: number): Promise<Category[]> => {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/home/categories/${libraryId}`);
        if (!response.ok) {
            throw new Error('خطا در دریافت دسته‌بندی‌ها');
        }
        return await response.json();
    } catch (error) {
        console.error('خطا در دریافت دسته‌بندی‌ها:', error);
        return [];
    }
};


interface BookDetails {
    id: number;
    bookName: string;
    imageSource: string;
    authorName: string[];
    translatorName: string[];
    categoryName: string;
    publisherName: string;
    numberPage: number;
    shabak: string;
    yearPublish: number;
    library: {
        id: number;
        libraryName: string;
    };
    subCategory: {
        id: number;
        name: string;
    };
}

export const getBookDetails = async (bookId: number): Promise<BookDetails | null> => {
    try {
        const response = await fetch(`${API_CONFIG.baseURL}/home/books/${bookId}`);
        if (!response.ok) {
            throw new Error('خطا در دریافت اطلاعات کتاب');
        }
        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error('خطا در دریافت اطلاعات کتاب:', error);
        return null;
    }
};

export const formatAuthors = (authors: string[]): string => {
    if (!authors || authors.length === 0) return '';
    if (authors.length === 1) return `نوشته شده توسط ${authors[0]}`;
    return `نوشته شده توسط ${authors.join(' و ')}`;
};

export const formatTranslators = (translators: string[]): string => {
    if (!translators || translators.length === 0 || (translators.length === 1 && translators[0] === '')) return '';
    if (translators.length === 1) return `ترجمه شده توسط ${translators[0]}`;
    return `ترجمه شده توسط ${translators.join(' و ')}`;
};