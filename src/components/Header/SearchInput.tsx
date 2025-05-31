import SearchIcon from '@/assets/svg/search.svg?react'

export const SearchInput = ({
                                value,
                                onChange,
                            }: {
    value: string
    onChange: (val: string) => void
}) => {
    return (
        <div className="relative flex-1">
            <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400 scale-x-[-1]"
                aria-hidden="true"
            />
            <input
                type="text"
                className="w-full pl-10 pr-3 py-2 text-sm rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}