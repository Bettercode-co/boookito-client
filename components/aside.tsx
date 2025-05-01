
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getLibraries, getCategories } from '../services/library';
import { Switch } from '@heroui/switch';

export const Aside = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // States
    const [libraries, setLibraries] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedLibrary, setSelectedLibrary] = useState(searchParams.get('library') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedSort, setSelectedSort] = useState(searchParams.get('sort') || '');
    const [pageCount, setPageCount] = useState(parseInt(searchParams.get('pageCount') || '1000'));
    const [hasImage, setHasImage] = useState(searchParams.get('hasImage') === 'true');
    const [isLoading, setIsLoading] = useState(false);
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const sortOptions = [
        { value: 'newest', label: 'جدیدترین کتاب' },
        { value: 'oldest', label: 'قدیمی‌ترین کتاب' },
        { value: 'most_popular', label: 'محبوب‌ترین' },
        { value: 'least_popular', label: 'کم طرفدارترین' }
    ];

    // Handlers
    const updateQueryString = (params: { [key: string]: string }) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        Object.entries(params).forEach(([key, value]) => {
            if (value) {
                newSearchParams.set(key, value);
            } else {
                newSearchParams.delete(key);
            }
        });
        router.push(`?${newSearchParams.toString()}`);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        setSelectedSort(value);
        updateQueryString({ sort: value });
    };

    const handleLibraryChange = (e) => {
        const value = e.target.value;
        setSelectedLibrary(value);
        updateQueryString({ library: value });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        updateQueryString({ category: value });
    };

    const handlePageCountChange = (e) => {
        const value = e.target.value;
        setPageCount(parseInt(value));
        updateQueryString({ pageCount: value });
    };

    const handleHasImageChange = (checked: boolean) => {
        setHasImage(checked);
        updateQueryString({ hasImage: checked ? 'true' : '' });
    };

    const handleResetFilters = () => {
        setSelectedLibrary('');
        setSelectedCategory('');
        setSelectedSort('');
        setPageCount(1000);
        setHasImage(false);
        setCategories([]);
        router.push(window.location.pathname);
        setIsMobileFilterOpen(false);
    };

    // Effects
    useEffect(() => {
        const fetchLibraries = async () => {
            const data = await getLibraries();
            setLibraries(data);
        };
        fetchLibraries();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            if (selectedLibrary) {
                setIsLoading(true);
                try {
                    const data = await getCategories(Number(selectedLibrary));
                    setCategories(data);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setCategories([]);
            }
        };
        fetchCategories();
    }, [selectedLibrary]);

    const FilterContent = () => (
        <div className="flex-grow space-y-6">
            <div>
                <label htmlFor="library" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">کتابخانه ها</label>
                <select
                    id="library"
                    name="library"
                    dir='rtl'
                    value={selectedLibrary}
                    onChange={handleLibraryChange}
                    className="mt-1 block w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 rounded-md bg-white text-gray-800"
                >
                    <option value="">انتخاب کتابخانه</option>
                    {libraries.map(library => (
                        <option key={library.id} value={library.id}>
                            {library.libraryName}
                        </option>
                    ))}
                </select>
            </div>

            {selectedLibrary && (
                <div>
                    <label htmlFor="category" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">دسته‌بندی‌ها</label>
                    {isLoading ? (
                        <div className="flex justify-center py-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-900 border-t-transparent"></div>
                        </div>
                    ) : (
                        <select
                            id="category"
                            name="category"
                            dir='rtl'
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="mt-1 block w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 rounded-md bg-white text-gray-800"
                        >
                            <option value="">انتخاب دسته‌بندی</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
            )}


            <div>
                <label htmlFor="sort" className="block text-xs font-medium text-gray-600 mb-1.5 uppercase tracking-wider">مرتب‌سازی</label>
                <select
                    id="sort"
                    name="sort"
                    dir='rtl'
                    value={selectedSort}
                    onChange={handleSortChange}
                    className="mt-1 block w-full pl-3 pr-10 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 rounded-md bg-white text-gray-800"
                >
                    <option value="">انتخاب کنید</option>
                    {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">تعداد صفحات</label>
                <div className="relative">
                    <input
                        type="range"
                        min="1"
                        max="1000"
                        value={pageCount}
                        onChange={handlePageCountChange}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-700"
                    />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1.5" dir="rtl">
                    <span>1</span>
                    <span>{pageCount}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">کتاب های دارای تصاویر</span>
                <Switch 

size="sm" 
                    color="success" 
                    isSelected={hasImage}
                    onValueChange={handleHasImageChange}
                    aria-label="نمایش کتاب‌های دارای تصویر"
                />
            </div>
        </div>
    );

    return (
        <>
            {/* دکمه فیلتر برای موبایل */}
            <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="fixed bottom-6 left-1/2 -translate-x-1/2 md:hidden z-50 bg-gray-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>فیلترها</span>
            </button>

            {/* Modal برای نمایش فیلترها در موبایل */}
            {isMobileFilterOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                    <div className="fixed inset-x-0 bottom-0 z-50">
                        <div className="bg-white rounded-t-2xl p-6 h-[90vh] flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold">فیلترها</h2>
                                <button 
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="text-gray-500"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto">
                                <FilterContent />
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-200 sticky bottom-0 bg-white space-y-3">
                                <button 
                                    onClick={handleResetFilters}
                                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    حذف تمامی فیلترها
                                </button>
                                <button 
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="w-full py-3 px-4 bg-gray-900 text-white rounded-lg font-medium"
                                >
                                    اعمال فیلترها
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* نمایش aside در دسکتاپ */}
            <aside className="hidden md:flex fixed top-20 right-6 w-64 bg-white p-6 shadow-md rounded-lg flex-col h-[calc(100vh-3.5rem-3rem)] md:h-[calc(100vh-3.5rem-4rem)] z-10 overflow-y-auto">
                <FilterContent />
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <button 
                        onClick={handleResetFilters}
                        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-400"
                    >
                        حذف تمامی فیلترها
                    </button>
                </div>
            </aside>
        </>
    );
};