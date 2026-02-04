# 🔧 CODE SỬA CHỮ CHI TIẾT

## 1️⃣ Sửa MovieCard.tsx

**File:** `web/components/MovieCard.tsx`

```tsx
import React from 'react'

interface MovieCardProps {
    data: Record<string, any>;
    onClick: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ data, onClick }) => {
    function clickHandler(e: any) {
        onClick(e.target.id)
    }

    return (
        <div 
            onClick={clickHandler} 
            id={data?.id}
            className="
                group 
                bg-zinc-900 
                relative 
                w-full
                h-auto
                aspect-video
                cursor-pointer
                overflow-hidden
                rounded-md
            "
        >
            <img
                id={data?.id}
                className="
                    w-full
                    h-full
                    object-cover
                    transition
                    duration-300
                    shadow-xl
                    opacity-90
                    border-2
                    border-zinc-900
                    group-hover:opacity-100
                    group-hover:border-white
                    group-hover:brightness-125
                    group-hover:scale-105
                "
                src={data?.thumbnailUrl}
                alt={data?.title || "Movie thumbnail"}
            />
        </div>
    )
}

export default MovieCard
```

**Thay đổi chính:**
- ✅ Xóa: `max-w-[273px]`, `max-h-[154px]`, `min-w`, `min-h`, `h-[12vw]`
- ✅ Thêm: `w-full`, `h-auto`, `aspect-video`
- ✅ Đơn giản: Chỉ cần 1 set class, không cần duplicate
- ✅ Thêm: `group-hover:scale-105` (zoom khi hover)

---

## 2️⃣ Sửa MovieList.tsx

**File:** `web/components/MovieList.tsx`

```tsx
import React from 'react'
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { movieActions } from "../store/movies";
import { useAppDispatch } from "../store/index";
import { useGetMovie } from "../hooks/useMovieList"

interface MovieListProps {
    data: Record<string, any>[],
    title: string
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    const dispatch = useAppDispatch();
    const getMovie = useGetMovie();

    if (isEmpty(data)) {
        return null
    }

    function clickHandler(id: string) {
        const movie = getMovie(id);
        dispatch(movieActions.showModal(movie));
    }

    return (
        <div className="relative top-[66px] sm:top-0 px-4 md:px-12 mt-4 space-y-8">
            <div className="">
                <p className="text-white mb-3 text-md md:text-xl lg:text-2xl font-semibold">
                    {title}
                </p>
                {/* Thay đổi: Grid columns */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4">
                    {data.map((movie) =>
                        <MovieCard
                            key={movie.id}
                            data={movie}
                            onClick={clickHandler}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieList
```

**Thay đổi chính:**
- ✅ Old: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4`
- ✅ New: `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-4`
- ✅ Lợi ích: Nhiều phim hiển thị, không quá hẹp

---

## 3️⃣ Sửa InfoModal.tsx

**File:** `web/components/InfoModal.tsx`

```tsx
import React, { useCallback, useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { AiOutlineClose } from "react-icons/ai"
import FavoriteButton from "./FavoriteButton"
import { BsFillPlayFill } from 'react-icons/bs';

import { movieActions } from "../store/movies";
import { useAppDispatch, useAppSelector } from "../store/index";

interface InfoModalProps {
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ onClose }) => {
    const movies = useAppSelector(state => state.movies);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const isVisible = movies.showModal
    if (!isVisible) return null;

    const data = movies.movie[0];

    const handleClose = () => {
        dispatch(movieActions.hideModal())
    }

    const redirectToWatch = () => router.push(`/watch/${data.id}`);

    return (
        <div className="
            z-50
            transition
            bg-black
            duration-300
            bg-opacity-80
            flex
            justify-center
            items-center
            overflow-x-hidden
            overflow-y-auto
            fixed
            inset-0
            p-4
        ">
            {/* Thay đổi: Responsive max-width */}
            <div className="
                relative
                w-full
                max-w-sm
                sm:max-w-md
                md:max-w-xl
                lg:max-w-2xl
                rounded-md
                overflow-hidden
                max-h-[90vh]
                overflow-y-auto
            ">
                <div className={`
                    ${isVisible ? 'scale-100' : 'scale-0'}
                    transform
                    duration-300
                    relative
                    flex-auto
                    bg-zinc-900
                    drop-shadow-md
                `}>
                    <div className="relative h-auto">
                        <video
                            className='
                                w-full
                                brightness-[60%]
                                object-cover
                                h-full
                            '
                            autoPlay
                            muted
                            loop
                            poster={data?.thumbnailUrl}
                            src={data?.videoUrl}
                        ></video>

                        {/* Thay đổi: Close button - tăng kích thước */}
                        <div
                            className='
                                cursor-pointer
                                absolute
                                top-3
                                right-3
                                h-10
                                w-10
                                sm:h-12
                                sm:w-12
                                md:h-12
                                md:w-12
                                rounded-full
                                bg-black
                                bg-opacity-70
                                flex
                                items-center
                                justify-center
                                hover:bg-opacity-90
                                transition-all
                                duration-200
                                z-10
                            '
                            onClick={handleClose}
                        >
                            <AiOutlineClose className="text-white" size={20} />
                        </div>

                        <div className="absolute bottom-[7%] left-5 sm:bottom-[10%] sm:left-10">
                            <p className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-5 sm:mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <div
                                    onClick={redirectToWatch}
                                    className="
                                        cursor-pointer
                                        w-6
                                        h-6
                                        lg:w-10
                                        lg:h-10
                                        bg-white
                                        rounded-full
                                        flex
                                        justify-center
                                        items-center
                                        transition
                                        hover:bg-neutral-300
                                    "
                                >
                                    <BsFillPlayFill className="text-black w-4 lg:w-6" />
                                </div>
                                <FavoriteButton movieId={data?.id} />
                            </div>
                        </div>
                    </div>

                    <div className="py-6 px-6 sm:py-8 sm:px-12">
                        <div className="flex flex-row items-center gap-2 mb-8">
                            <p className="text-green-400 font-semibold text-lg">
                                New
                            </p>
                            <p className="text-white text-lg">
                                {data?.duration}
                            </p>
                            <p className="text-white text-lg">
                                {data?.genre}
                            </p>
                        </div>
                        <p className="text-white text-lg line-clamp-3 sm:line-clamp-none">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoModal
```

**Thay đổi chính:**
- ✅ Old: `w-auto mx-2 max-w-2xl`
- ✅ New: `w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl p-4`
- ✅ Old: `h-10 w-10`
- ✅ New: `h-10 w-10 sm:h-12 sm:w-12 md:h-12 md:w-12` (tăng trên tablet+)
- ✅ Thêm: `max-h-[90vh] overflow-y-auto` (scroll nếu content quá dài)
- ✅ Thêm: `hover:bg-opacity-90` (hover effect nút X)
- ✅ Thêm: `z-10` (đảm bảo nút X nằm trên video)

---

## 📊 COMPARISON TABLE

| Component | Trước | Sau | Lợi Ích |
|-----------|------|-----|--------|
| **MovieCard** | Fixed 273x154px | aspect-video fluid | ✅ Responsive, không mất ảnh |
| **MovieList Grid** | 5 cột desktop | 6 cột desktop | ✅ Hiển thị nhiều hơn |
| **Gap** | 4 (16px) | 2 (8px) desktop | ✅ Tiết kiệm không gian |
| **Modal Mobile** | 672px (vượt) | 384px (fit) | ✅ Lên màn hình |
| **Close Button** | 40x40px | 48x48px+ | ✅ Dễ bấm hơn |

---

## ✅ QUICK COPY-PASTE

### Nếu muốn fix nhanh, dùng regex search-replace:

**MovieCard.tsx - Thay class container:**
```
❌ Tìm:
        className="
            group 
            bg-zinc-900 
            col-span 
            relative 
            max-w-[273px] max-h-[154px]
            min-w-[200px] min-h-[112px] 
            h-[12vw] 
        "

✅ Thay bằng:
        className="
            group 
            bg-zinc-900 
            relative 
            w-full
            h-auto
            aspect-video
            cursor-pointer
            overflow-hidden
            rounded-md
        "
```

**MovieCard.tsx - Thay class img:**
```
❌ Tìm:
        className="
            cursor-pointer
            object-cover
            transition
            duration
            delay-100
            shadow-xl
            rounded-md
            opacity-90
            min-w-[200px]
            min-h-[112px]
            max-w-[273px] 
            max-h-[154px]
            w-full
            h-[12vw]
            border-solid border-2 
            border-zinc-900
            group-hover:opacity-100
            group-hover:border-white
            group-hover:brightness-125
        "

✅ Thay bằng:
        className="
            w-full
            h-full
            object-cover
            transition
            duration-300
            shadow-xl
            opacity-90
            border-2
            border-zinc-900
            group-hover:opacity-100
            group-hover:border-white
            group-hover:brightness-125
            group-hover:scale-105
        "
```

---

## 🎯 TESTING STEPS

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Test MovieCard (Trending section):**
   - Desktop: Mỗi hàng 5-6 phim ✅
   - Tablet: Mỗi hàng 4-5 phim ✅
   - Mobile: Mỗi hàng 2 phim ✅
   - Ảnh không bị cắt ✅

3. **Test InfoModal:**
   - Click phim → Modal hiện ✅
   - Mobile < 384px ✅
   - Nút X visible & bấm được ✅
   - Scroll content nếu quá dài ✅
   - Click X → Modal đóng ✅

4. **Performance:**
   - Không lag khi hover ✅
   - Animation smooth ✅
   - Image load nhanh ✅

---

## 🔗 FILES LIÊN QUAN

- `web/components/MovieCard.tsx` - Card component
- `web/components/MovieList.tsx` - List container
- `web/components/InfoModal.tsx` - Modal popup
- `web/components/Billboard.tsx` - (Có thể cũng cần fix tương tự)
- `web/styles/globals.css` - Global CSS (nếu cần)

---

## 💡 TIPS THÊM

1. **Dùng DevTools Check:**
   - F12 → Elements → Click vào element
   - Xem computed styles & CSS classes

2. **Test Responsive:**
   - F12 → Toggle device toolbar (Ctrl+Shift+M)
   - Thử 360px, 768px, 1024px, 1920px

3. **Performance Check:**
   - F12 → Lighthouse
   - Check CLS (Cumulative Layout Shift)

4. **Accessibility:**
   - Nút X phải có `aria-label="Close"`
   - Images phải có `alt` text
