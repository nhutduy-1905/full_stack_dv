import React from 'react'


interface MovieCardProps {
    data: Record<string, any>;
    onClick: (id: string) => void;
}

const MovieCard:React.FC<MovieCardProps> = ({data, onClick}) => {
    function clickHandler(e: any){
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
            aspect-[2/3]
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

export default MovieCard;
