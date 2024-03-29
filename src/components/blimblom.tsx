import Link from "next/link"
import { useRouter } from "next/router"

export default function ItemNoteOfListShowNotes (props: any){

    const router = useRouter()

    function handleEditNote(id: number){
        router.push({
            pathname: `/editNote/${id}`
        })
    }
    return (
        <>   
            <li className="w-full bg-[#FBF9F1]" onClick={() => handleEditNote(props.id)}>
                <div id="DB_Note" className="w-full flex justify-between h-14">
                    <div className="flex flex-col justify-around overflow-hidden px-2 py-1">
                        <p id="title_Note" className=" whitespace-nowrap overflow-hidden text-lg ">{props.title}</p>
                        <p id="content_Note" className=" text-xs overflow-hidden ">{props.content}</p>
                    </div>
                    <span className="">...</span>
                </div>
            </li><hr></hr>
        </>
    )
}